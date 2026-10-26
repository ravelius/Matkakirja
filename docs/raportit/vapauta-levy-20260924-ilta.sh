#!/bin/bash
# Fable 24.9.2026 klo 22.5x: levy 28 Gt vapaana (raja 35). Poistaa proto-3d/lokit-kansiot, joihin mikään committoitu raportti ei viittaa.
# Omistaja ajaa: bash docs/raportit/vapauta-levy-20260924-ilta.sh
set -u; L=/Users/Shared/Claude/proto-3d/lokit; df -h /System/Volumes/Data | tail -1
rm -rf "$L/kontakti-pisteet-794e96f"   # 612 Mt
rm -rf "$L/maaraja-20260924"   # 602 Mt
rm -rf "$L/maat-20260924-7aca1d5"   # 596 Mt
rm -rf "$L/kosketusala3-20260924"   # 583 Mt
rm -rf "$L/ui-napauta-20260924"   # 572 Mt
rm -rf "$L/kosketusala2-20260924"   # 572 Mt
rm -rf "$L/kosketusala-20260924"   # 560 Mt
rm -rf "$L/tummuus175-20260924"   # 552 Mt
rm -rf "$L/ipad-pisteet-20260924"   # 552 Mt
rm -rf "$L/tummuus49-20260924"   # 537 Mt
rm -rf "$L/sininen-20260924-b"   # 534 Mt
rm -rf "$L/kontakti-20260924-d"   # 534 Mt
rm -rf "$L/sininen-20260924"   # 517 Mt
rm -rf "$L/karuselli-20260924"   # 514 Mt
rm -rf "$L/kontakti-20260924-c"   # 513 Mt
rm -rf "$L/kontakti-20260924-b"   # 513 Mt
rm -rf "$L/kontakti-20260924-dac4590"   # 510 Mt
rm -rf "$L/karuselli-sumea2-20260924"   # 510 Mt
rm -rf "$L/karuselli-sumea-20260924"   # 510 Mt
rm -rf "$L/aikajanatesti-20260924c"   # 505 Mt
rm -rf "$L/ipad-media-20260924"   # 502 Mt
rm -rf "$L/aikajanatesti-20260924b"   # 495 Mt
rm -rf "$L/isoisatesti-20260924"   # 492 Mt
rm -rf "$L/astrotesti-20260924d"   # 492 Mt
rm -rf "$L/astrotesti-20260924"   # 492 Mt
rm -rf "$L/aikajanatesti-20260924"   # 492 Mt
rm -rf "$L/astrotesti-20260924c"   # 488 Mt
rm -rf "$L/astrotesti-20260924b"   # 485 Mt
rm -rf "$L/b12f-app"   # 305 Mt
rm -rf "$L/b12g-app"   # 304 Mt
df -h /System/Volumes/Data | tail -1
