#!/bin/sh
# Postivahdin kierros (omistaja 20.10.2026 15.23, Raamattu 7.22): aloitus-, luovutus- ja tilatiedostojen sekä MEMORY.md:n koot.
# Tulostaa "YLITYS|rooli|tiedosto|koko" per ylitys tai "OK"; poistumiskoodi 1 = ylityksiä. Logiikka: tarkista-tiedostokoot.mjs.
exec node "$(dirname "$0")/tarkista-tiedostokoot.mjs" "$@"
