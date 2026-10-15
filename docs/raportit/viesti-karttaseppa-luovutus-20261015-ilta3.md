# Karttasepän luovutus 15.10.2026 klo 18.2x (PT: konteksti 28 %; PT ja Postivahti)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261015-ilta2.md` (9e8974d91).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Aja git fetch origin, lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261015-ilta3.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. Jatka kohdasta 1.

## 1. AVOIN: pallon lohkoton vienti → T7 (edellisen luovutuksen kohta 1)

Julkaisija 18.2x: ajo katkesi nollauksessa, jatkettu JATKA=1, **valmis arviolta ~19.40, kuittaa silloin**. ÄLÄ siirrä ennen kuittausta.
Esikopio on jo tehty 17.34 (`rsync -a` → `/Volumes/T7 4TB/koodaus/proto-3d/_valmiit/pallo-lohkoton-vienti-20261015`, 611 686 tiedostoa,
lähde 611 683). Kuittauksen jälkeen: aja `rsync -a` uudelleen (skripti scratchpadissa ei säily: `rsync -a <lähde> "/Volumes/T7 4TB/koodaus/proto-3d/_valmiit/"`),
vertaa `find -type f | wc -l` molemmista, sitten poista sisäiseltä levyltä (PT: levytila). Ei osoitinvaihtoa ennen junaa 195.
Natiivi wt `proto-karttaseppa-ruudukko-195` (bfe2b2300) junaan 195 vasta, kun vienti on ämpärissä.

## 2. AVOIN (PT 18.2x, LS1:n löydös): Ateenan lento Hefaistos → Akropolis 53,5 s (raja ≤ 35 s)

Tarkista, johtuuko maastosta vai reittikorkeudesta. Jos reittikorkeus/lentosääntö → rivi PT:lle (ohjaa LS1:lle). Lähtötiedot:
- Hefaistos 37,97562/23,72139 (ENU ~ 276, 531), Propylaia-piste 37,97155/23,72495 (~ 589, 212), väli ~450 m. Silmä Hefaistos 35–48 m,
  Propylaia 50–70 m maasta → nousu ~60–70 m. Kesto lasketaan natiivissa `Linssit/Ydin/Kierros/OpasSilmukka.cs` (LiukuS, lentosääntö,
  PalloLoppuS, spiraali), maa kehyksestä `OpasSovitin.Korkeus` (DSM-kehä; DSM ennallaan v3:ssa). Korostuksen pohja Propylaialla on
  pintamallista 157,1 vs. maanpinta v3 169,0 (ellipsoidi) → kehys "maan alla" voi pidentää nousua.
- Data: scratchpadin `ateena30`-kansio ei säily; käytä T7 `Matkakirja-karttaseppa/kierrostarkistus-20261015/data` (kierros ateena.json,
  korkeus-ateena.json 30 m, maa-ateena-v2) + `_valmiit/maa-ateena-v3-vienti-20261015` ja tarkista.py (`_tyo/karttaseppa/kierrostarkistus-20261015/`).

## 3. AVOIN, odottaa omistajaa: aloituskartan vihjeet + ISS-raketin kuvapari (KK:n toimeksianto kohdat 3–4)

Valmis 37239fee7, PT:lle ilmoitettu 18.2x. Kaikki `_tyo/karttaseppa/aloituskartta-vihjeet-20261015/` (LUEMINUT.md, vihjeet-kuvapari.jpg,
raketti/raketti-kuvapari.jpg, pallo.py = valintanäkymän luonnospallo pohjalaatoista, pari.py).
- Vihjeet: 9 akvarellipienoismallia näkyvään kehään; 4 olemassa olevaa (tripoli, bagdad, teheran, dubai) + 5 uutta Codexilta
  (Giza, Marrakech/Koutoubia, Saharan karavaani, Samarkand/Registan, Grönlannin jäävuoret) → **omistajan lupa 5 kuvan generoinnille**
  KK:n kortilla. Luvan jälkeen: Codex-tilaus postiin (`posti/`, haara claude/postilaatikko; resepti assets/kartat/miniatyyrit/LUEMINUT.md),
  PT hyväksyy kuvat, sitten vihjedata + NUI:n kytkentä (ehdotus: vain valintanäkymässä, napautus = nimi + "Odottaa myöhempiä matkoja").
- Raketti: karttapalettiehdotus, glb valmiina `raketti/iss_raketti_kartta-karttapaletti.glb`; kytkentä vasta päätöksen jälkeen
  (Resources/KaupunkiPallo/raketti_kartta, LR:n malli).

## 4. Tämän vuoron valmiit (kuitattu)

- **Ateenan maanpinta v3** 7a16a11d0 (Erekhtheion, Akropoliin itäpää, Plakan rinteet): `_valmiit/maa-ateena-v3-vienti-20261015`, VIETY.
  Työkalu T7 `vesimaski/maa-kukkulat.py` (v3-argumentit puut.bytes + muinaisalueet.json; v2 toistuu tavulleen ilman), `arkeologiset.py`,
  `puut_lue.py`. Raportti `_tyo/karttaseppa/kierrostarkistus-20261015/ateena-v3/`.
- **Ateenan vesi 20 km** (ateena2-8m + index-v25): VIETY; natiivi `karttaseppa/ateena-vesi-195` 9ec2636f5 (NS runkoon, PT kuittasi).
  Ajoskripti T7 `_tyo/karttaseppa/ateena-vesi-20km-20261015/aja.log` (ketju kuten kaupunkipaketti-dsm.sh vaihe 4, säde 20).

## 5. Worktreet (poista kun mergetty)

proto-karttaseppa-ateena-vesi-195 (uusi, NS:n junassa), proto-karttaseppa-ruudukko-195, karttaseppa-paakaupungit-pysakeiksi-193b,
proto-karttaseppa-kierrokset-194, proto-karttaseppa-iss-skanneri-193.

## Muistiinpanot

- Natiivin testit: `sh Linssit-testit/kaanna.sh <nimi>` (sh, ei zsh: sana-jako).
- Ateenan merenpinta ellipsoidista 38,25 m (EGM2008 N); venv-kartan pyprojissa ei geoidiruudukkoa.
- Googlen laatoista ei mitata mitään; robots.txt ennen skriptattua hakua.
