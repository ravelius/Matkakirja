# Valosepän luovutus 2.11.2026 klo 17.40

Syy: konteksti 26 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261102-1545.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 15.51–17.4x).
Skriptit `_tyo/linssiseppa2/skriptit-20261031/` (uusimmat salit2/3, koonti-salit, pinnat1/2 *-ajo.zsh + *-skenaario.txt).
Mittarit ja tulokset: `_tyo/linssiseppa2/salit3/erot.md` (+ salit-pari.jpg).

## VALMIS JA RUNGOSSA 218 (a7cdb4478, NS, ancestry tarkistettu)
- f89626485: kaikki piilotetut palatsin katot heittävät varjon (ShadowsOnly), QA `valo piilokattovarjo 0|1`.
- ad9a6cea7: piilotetun palatsin katon alla salin lämmin täyttö (_JuoksuSaliLampo) ilman juovia; `valo kattotieto` näyttää
  häivytyskatot (peitto, sali, vainvarjo, lodhäiv) eikä enää Karttapisteitä.
- PT kuittasi 16.3x; mallin puoli (tumma laatta, tasaiset seinät) → LAV teki rakennukset-v111.

## PT:N KUITTAUKSESSA (lähetetty 17.40)
- **32fbecda3** (linssiseppa2/kattoalla-218 natiivi-backup = runko a7cdb4478 + 1): katettu täyttö myös NÄKYVÄN palatsin katon alla
  (储秀宫:n katto pysyy näkyvissä kameran ollessa katon alla → lattia sai ulkovarjon sinisen 99/106/133 → 110/111/124 ja 127/130/146).
  Regressio editori kaikki (havainne-editori-20261102-172057 → -172556): 01–07 0,4–1,3 % px, L ±0,5. Valovahti ok.
  Kuittauksen jälkeen: mergepyyntö NS:lle (send_message), tarkista ancestry.

## LAV:N SALIPINNAT (v111) VALOSSA – TEHTY 17.4x
- Tulos: vaalea lattia p50 113–134 (havainne ~163), puhki ≤ 1,4 % (04 2,0), saumat ohuet ja vaaleahkot → ok; lähetetty PT + LAV.
- v111 ei ollut mediassa: koehaara linssiseppa2/salipinnat-218 (e8205630b = runko + tausta-v108, rakennukset-v111, esto-v33,
  ProjectSettings insecureHttpOption 1 + 32fbecda3; EI JUNAAN) ja paikallinen välitys `skriptit-20261031/v111-valitys.py` portissa
  8787 (v111 levyltä `_valmiit/…rakennukset-v111-vienti-20261102`, muu 302 mediaan); skenaariossa `ui juoksupeli v4juuri
  http://127.0.0.1:8787/juoksupeli/maailma-v4` ennen `v4 7`. Käynnistys: `python3 -I …/v111-valitys.py 8787` (taustalla).
- Avoin pieni: 储秀宫 ovelta päin (cd) lattia yhä hieman sinertävä 127/130/146 – jos PT haluaa, selvitä (useampi katto / juova).
- Kuvauspaikat: 永寿宫 ja 咸福宫 kamera väliseinän sisällä (havainne 04 -kamera 4 m takana) → seuraavassa ajossa siirrä keisaria.

## Worktreet (proto-3d)
- wt/proto-linssiseppa2-seinat218: haarassa linssiseppa2/salipinnat-218 (koe). Haarat salit-218 (koe), salikatot-218 (rungossa),
  kattoalla-218 (PT:llä) natiivi-backupissa.
- Poistettu Postivahdin pyynnöstä: linssiseppa2-luovutus0425, valoseppa-luovutus-20261102-0540 (haarat originissa; niiden
  luovutustiedostot 0425/0540 eivät ole mainissa).
