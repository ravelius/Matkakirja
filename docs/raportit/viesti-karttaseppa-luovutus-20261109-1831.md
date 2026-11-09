# Karttaseppä: luovutus 9.11.2026 klo 18.31 (KS)
Syy: konteksti 25 % (hook), pehmeä raja. Korvaa -1728:n; sen sisältö (haara karttaseppa/luovutus-20261109-1728) on voimassa paitsi kohdat, jotka tämä päivittää.
`T=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nostot-korostetut-20261109/` · natiivi worktree /Users/Shared/Claude/wt/proto-karttaseppa-tietonapautus (haara **karttaseppa/tietonapautus**, remote **natiivi-backup**, EI origin). **Uusin natiivi 9be5c8e2e = junan 224 ehto (PT).**

## TEHTY (17.33–18.31)
1. **Grand Palais ✦ (dbe105f0f, ipad-pieni) ✓** → PT:lle (`$T/gp-tahti-1000/`).
2. **Esittelyn väistö uusittu** (NahtavyysEsittely.VaistaEsteet), kaikki unity-tarkistus sh 0, natiivi-backupissa:
   - 909d89b78 / ee7086b18: porrastus (välivaiheet, korvattu).
   - **fd079ee0e**: näkyvyyspohjainen — mallin mitatut korkeus/säde (`Rajat`, eriytetty Mitat-funktiosta), kuvakulma zoomista (TanPysty, Suhde); taso 0 = malli kohteen edessä kuvassa ≥ EsteKuvaOsuus 0.15 (EsteKaistaM 150), taso 1 = peittää. **Temple-väistö ✓ (PT kuittasi)**: "este Notre-Dame (kuvassa 0.98) … kierto 20° → -90°".
   - **534159c74**: Nahtavyysalue.Kylttikohde.**Osuu** vaatii mallin kolmion sormen alla (PeittaaTarkasti, OsumaSormi 0.01); Lontoon kohde (ei Maaritys-mallia) yhä rajalaatikko. Syy: ND-malli 620 m korkea, säde 198 m → rajalaatikko sieppasi Forum des Hallesin napautuksen.
   - **9be5c8e2e**: **KiinteatKierrot**-taulu (PT: ei 4. väistöversiota) — Sainte-Chapelle 90° → 0° (lännestä, ND takana). **Mallinostot-7 ✓** (SC etualalla, Grand Palais ✓), pari PT:lle `$T/mallinostot-7-1000/pari-sc-6-vs-7.png`.
3. **Skenaariovirhe löydetty:** `ui pinnaus napauta-sulje` EI ole komento (tulostaa vain tilan) → oikea `ui pinnaus pois`. Korjattu sk-pariisi-mallinostot-6, sk-pariisi-nimet-3, sk-lontoo-kyltit. (Aiemmat mallinostot-4/5 eivät siis sulkeneet esittelyä.)
4. **Nimet-2 (fd079ee0e):** Tuileries ✓, Luxembourg ✓ (nimen napautus 0.5 0.54 → noston esittely), Forum ✗ (yllä kohdat 2–3). Nimet sijaitsevat ~0,04 ruudun keskipisteen yläpuolella → skenaarioissa `napauta 0.5 0.54`.
5. **ORNC-wiki (PT/PK) suljettu:** fi-wikiä ei ole, natiivi (PuluChat.HaeYhteenveto fi→en) ja web (WIKI_LANGS) hakevat en-wikin; PK vahvisti, ei toimia.

## JONO (JU, 9be5c8e2e, Mac; valmis-rivi KS:lle)
1. **ks-pariisi-nimet-3-9be5c8e2e** (`$T/sk-pariisi-nimet-3-mac.txt`): Tuileries/Luxembourg/Forum nimen napautus → noston esittely; LOPUSSA PT:n pyytämä ND-testi: `nd-tyhja-napautettu` = napautus (0.66, 0.78) tyhjään kohtaan ND:n rajalaatikossa → EI esittelyä (lokissa ei "mallin napautus Notre-Dame"); `nd-malli-napautettu` (0.5 0.5) → ND:n esittely. Tarkista ennen-kuvasta, että 0.66 0.78 oli tyhjä mutta laatikon sisällä. → kuvat PT:lle.
2. **ks-lontoo-kyltit-9be5c8e2e** (`$T/sk-lontoo-kyltit-mac.txt`): Westminster, Cutty Sark, Kensington (+1): kyltin napautus → esittely → kuvapari PT:lle ennen junaa.
Kun molemmat katsottu ja PT kuittaa: natiivi karttaseppa/tietonapautus junaan PT:n kautta (ei omaa mergeä).

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min).
- Ajovahti: scratchpad ei säily → tee uusi: glob `/Users/Shared/Claude/proto-3d/lokit/ks-*-9be5c8e2e(N)`, rivi kun loki.txt:ssä `valmis N s`/VIRHE; arkit `sips -Z 1000` + PIL-rinnakkain (≤ 1000 px).
