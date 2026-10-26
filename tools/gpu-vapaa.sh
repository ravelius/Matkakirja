#!/usr/bin/env bash
#
# GPU-VÄISTÖ: onko omistaja laittanut koneen kevyeen tilaan?
#
# Omistajan sääntö 28.9.2026 "GPU-VÄISTÖ AUTOMAATTISEKSI" (täsmennys
# klo 12.3x: ei ohjelmatunnistusta, vain lippu): Mac-ajurin savukesarja
# kilpailee GPU:sta omistajan omien töiden kanssa. Omistaja luo lipun
# /tmp/matkakirja-kevyt, kun tarvitsee konetta. tools/savukkeet/
# aja-sarja.mjs ajaa tämän kerran sarjan alussa; kun GPU on varattu,
# Chromium-rivit ajetaan SwiftShaderilla ja WebKit- ja suorituskykyrivit
# ohitetaan.
#
#   tools/gpu-vapaa.sh
#
#   exit 0  lippua ei ole (ei tulostetta)
#   exit 1  lippu on; tulostaa "kevyt tila (omistaja tarvitsee konetta)"
#
# Ympäristömuuttujat:
#   GPU_VAPAA_PAKOTA=1  aina exit 0 (testit ja käsiajo)
#   GPU_VAPAA_PAKOTA=0  aina exit 1, tulosteena "pakotettu"
#   GPU_VAPAA_LIPPU     lipun polku (oletus /tmp/matkakirja-kevyt; testit)
set -uo pipefail

LIPPU="${GPU_VAPAA_LIPPU:-/tmp/matkakirja-kevyt}"

case "${GPU_VAPAA_PAKOTA:-}" in
  1) exit 0 ;;
  0) echo "pakotettu"; exit 1 ;;
esac

if [ -e "$LIPPU" ]; then
  echo "kevyt tila (omistaja tarvitsee konetta)"
  exit 1
fi
exit 0
