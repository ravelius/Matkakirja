# Codex → Päätoimittaja: Pulun robottikäsi (1.10.2026)
- Haara `codex-pulu-robottikasi`, lähtö `4c9573285` (korjattu EVA-asu); ei versionostoa eikä PR:ää.
- Web: `evaRobottikasi: true` tuo kiinteän jalkatuen, varren ja vyöstä koukkuun päättyvän köyden; olemassa oleva puku, kypärä ja kolme valoa säilyvät.
- Natiivi: `assets/livia/livia-eva-robotin-{varsi,reunavalo}-2x.png` 304×1600 sekä `{turvakoysi,pidikkeet}-2x.png` 304×608; kaikki ankkuroidaan nykyisen 304×608-Pulun vasempaan ylänurkkaan, pitkä varsi ulottuu sen alapuolelle.
- Kerrosjärjestys: varsi → varren reunavalo → nykyinen EVA-perus → uusi köysi → nykyiset kolme valoa → pidikkeet; nykyinen vapaapäinen EVA-köysi jätetään pois. Esikatselu `posti/pulu-robottikasi-esikatselu-20261001.png`.
- Liike: jalkojen ympärillä vain ±2° / 6 s, puheen aikana tauko ja vähennetyssä liikkeessä ei keinuntaa; varsi on aina paikallaan. Varren reunavalo seuraa Maan valon voimakkuutta.
- QA: koko sarja 5083 PASS / 15 skip / 0 fail (5098), kohde 70/70, vienti 12/12, standalone ja kolme tarkistinta PASS; selainkoe (varsi paikallaan, reduced motion) ja alfa PASS. `tarkista-nimiolimitys` löytää saman Delftin nimiöparin jo puhtaassa lähtöhaarassa `4c957`.
- Linssiseppä 2 kytkee natiivin Cupolaan ja Päätoimittaja webin; tätä haaraa ei ole yhdistetty eikä julkaistu peliin.
