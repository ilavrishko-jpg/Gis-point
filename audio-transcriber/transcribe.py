#!/usr/bin/env python3
"""Транскрипція аудіозаписів (диктофон iPhone .m4a та ін.) в український текст.

Працює локально через faster-whisper: файл нікуди не надсилається,
обмежень на розмір немає (250 МБ і більше — ок).

Приклад:
    python transcribe.py "Новий запис.m4a"
"""
from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path


def fmt_ts(seconds: float, sep: str = ",") -> str:
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d}{sep}{ms:03d}"


def pick_device(requested: str) -> tuple[str, str]:
    """Повертає (device, compute_type)."""
    if requested == "cpu":
        return "cpu", "int8"
    try:
        import ctranslate2

        if ctranslate2.get_cuda_device_count() > 0:
            return "cuda", "float16"
    except Exception:
        pass
    if requested == "cuda":
        sys.exit("Помилка: відеокарту NVIDIA (CUDA) не знайдено. Запустіть без --device.")
    return "cpu", "int8"


def main() -> None:
    p = argparse.ArgumentParser(description="Транскрипція аудіо в український текст")
    p.add_argument("audio", type=Path, help="аудіофайл (.m4a, .mp3, .wav, .mp4 ...)")
    p.add_argument(
        "-m", "--model", default="large-v3-turbo",
        help="модель Whisper: large-v3-turbo (типова, швидка й якісна), "
             "large-v3 (найточніша, повільна), medium, small (найшвидша)",
    )
    p.add_argument("-l", "--language", default="uk", help="мова запису (типово: uk)")
    p.add_argument("-o", "--output-dir", type=Path, help="куди зберегти результат (типово: поруч із файлом)")
    p.add_argument("--device", choices=["auto", "cpu", "cuda"], default="auto")
    p.add_argument("--prompt", default=None,
                   help="підказка: імена, терміни, назви компаній, що звучать у записі")
    p.add_argument("--no-vad", action="store_true", help="не вирізати тишу перед розпізнаванням")
    args = p.parse_args()

    if not args.audio.is_file():
        sys.exit(f"Помилка: файл не знайдено: {args.audio}")

    try:
        from faster_whisper import WhisperModel
    except ImportError:
        sys.exit("Не встановлено faster-whisper. Виконайте: pip install -r requirements.txt")

    out_dir = args.output_dir or args.audio.parent
    out_dir.mkdir(parents=True, exist_ok=True)
    base = out_dir / args.audio.stem
    txt_path, ts_path, srt_path = (
        base.with_suffix(".txt"),
        Path(f"{base}.timestamps.txt"),
        base.with_suffix(".srt"),
    )

    device, compute_type = pick_device(args.device)
    print(f"Модель: {args.model} | пристрій: {device} ({compute_type})")
    print("Завантаження моделі (перший запуск качає її з інтернету, ~1.5 ГБ)...")
    model = WhisperModel(args.model, device=device, compute_type=compute_type)

    segments, info = model.transcribe(
        str(args.audio),
        language=args.language,
        vad_filter=not args.no_vad,
        vad_parameters={"min_silence_duration_ms": 500},
        beam_size=5,
        initial_prompt=args.prompt,
        # не тягнути контекст із попереднього фрагмента: на довгих записах
        # це захищає від зациклення на одній фразі
        condition_on_previous_text=False,
    )
    total = info.duration
    print(f"Тривалість запису: {fmt_ts(total, '.')[:8]}. Розпізнавання...")

    started = time.time()
    n = 0
    # Пишемо результат одразу, тож перерваний запуск не втрачає вже зроблене.
    with open(txt_path, "w", encoding="utf-8") as f_txt, \
         open(ts_path, "w", encoding="utf-8") as f_ts, \
         open(srt_path, "w", encoding="utf-8") as f_srt:
        for seg in segments:
            text = seg.text.strip()
            if not text:
                continue
            n += 1
            f_txt.write(text + "\n")
            f_ts.write(f"[{fmt_ts(seg.start, '.')[:8]}] {text}\n")
            f_srt.write(f"{n}\n{fmt_ts(seg.start)} --> {fmt_ts(seg.end)}\n{text}\n\n")
            for f in (f_txt, f_ts, f_srt):
                f.flush()

            elapsed = time.time() - started
            pct = min(seg.end / total, 1.0) if total else 0
            eta = elapsed / pct - elapsed if pct > 0.01 else 0
            print(
                f"\r{pct:6.1%} | {fmt_ts(seg.end, '.')[:8]} / {fmt_ts(total, '.')[:8]}"
                f" | залишилось ~{int(eta // 60)} хв ",
                end="", flush=True,
            )

    print(f"\nГотово за {int((time.time() - started) // 60)} хв. Файли:")
    print(f"  {txt_path}  — чистий текст")
    print(f"  {ts_path}  — текст із часовими мітками")
    print(f"  {srt_path}  — субтитри")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit("\nПерервано. Уже розпізнана частина збережена у файлах.")
