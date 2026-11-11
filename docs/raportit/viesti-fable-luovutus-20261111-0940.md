# PT:n luovutus 11.11.2026 klo 09.40 (konteksti 30 %)

Korvaa luovutuksen -0855 juna-, rooli- ja muut-kohdat. Keskustelutallenne: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-11-klo-0856-0938.md.

## Juna 224 (linkissä)
- 224.63 LINKISSÄ (JU 09.35, 79b04e870): KS 77e2a7d72 Grand Palais koodina oletukseen + talot pariisi v12 (GP-raivaus + SC-lovi KJ33), v12 ämpärissä 09.24.
- 224.64 MR57 käynnissä: NS 474fb5642 juoksupelin kuvan kopio pois (−3,0 ms, kuva sama; pt-ok 09.31). EI 41bbbc320:tä (leivheitto pois): KK pysäytti 09.4x kaikki kuvaa muuttavat juoksuvivut.
- pt-ok: /Users/Shared/Claude/julkaisija-tyokalut/linkki-224-uutta/224.N.pt-ok (PT kirjoittaa; Uutta-tekstin 224.N.txt kirjoittaa JU, ei PT).

## Raamattu tänään (mainissa)
- PR 6566 (e1872728d): äänitysohje yhdeksi, omistaja 08.58 ("Kirjaa äänitys ohje raamattuun ja tarkista että siellä ei ole kilpailevia ohjeita"): 5.1 ÄÄNITYSLUPA JA TEKOTAPA (puheäänitykset: alle 3 % KK, yli 3 % omistajan kortti, uudet tekstit listana), 5.2, 5.4, 5.12, 5.28, 7.14, 7.15, 7.27, 11.x, 12.23 + 6 pohjaa. Lyria ja tekoälytehosteet ennallaan omistajan luvalla; 5.6 (julkaistujen ottojen vaihto) ennallaan, KK hyväksyi kapean tulkinnan.
- PR 6567: 12.26 + 7.41 ison iPadin jumin takaportti A–C (JU ipad-takaportti.zsh, C-raja 360 s). Loki 09.02 ja 09.29.

## Roolit (kaikki nollattu 09.0x–09.3x paitsi KS ja NS levon alkaessa)
- NS (luovutus 5a9062b5b + lisäys): juoksuvivut HYLLYLLÄ: ensin vastaus KK:lle 3 kysymykseen (mitä 58,6 ms on, todellinen ruutunopeus koko reitillä julkaistulla rungolla isolla iPadilla, mistä työ lähti); omistaja 09.4x "kyllä juoksupeli on minusta pyörinyt ihan hyvin". Saapumiskoe 2 (1c92f7cea) KK:lla: K1–K4 ok, 36,9–37,9 s tason hyppy KK arvioi; iPad-muisti-1 jonossa. Laattamuisti: PT:n sana ajoille ERIKSEEN 1) Pallon välimuisti 256→64, 2) + rasterivirhe 2→4, 3) + tekstuuri 1024; historia 3676 vs. tuore 2851 Mt.
- NUI: 1) pallovika (omistaja 09.23 "kuumailmapallo ei pysy paikallaan…"): syy ankkurin MaaM 0 → ~156 m maan alla; korjaus tekeillä (Pariisi 78 m, Lontoo 51 m), tallenne KK:lle. 2) katse-2 af1f62bd4 talot v12:lla (SC-paperiseinät), Eiffelin huippu yläpalkin alle; sulku 5ce4232cd. ★-isäntä af1f62bd4 (KS testaa).
- KS (luovutus bf350d853/42c137118): Montparnasse 8348e4eac v38 KJ36 JU:lla; Orsay-pari; sitten KIINNITETTY PALLO (kenttä 40–50 m Tuileries, kori, köysi, ankkuri NUI:n kanssa; työlistarivi); sitten Overture-mittaus (data haettu, ODbL ok vain mittaukseen, loki KARSINTA 11.10.).
- VS: pilvivarjot 2813294de (jatkuva liike, kello seisoo levossa) Mac-ajo JU:lla → KK; jos pysähtyneet näyttävät kuolleilta, KK vie omistajalle pysähtyvät | pois. Kynä v4 ea0bee3ce (oletus, KK hyväksyi) Mac + iPad-hinta JU:lla.
- LAV (luovutus ed4ae1c25): M4/M5-levy = taustan ikkunakehys (tee_ikkuna.py, 2044 kolm.) → seuraaja ajaa + pari KK:lle; E4 ok v133:een, E1 kaistale pois; PK:n 13 kansilaattaa korjattu. v133 → pari KK:lle → juna.
- PK: B1 bcf32314c (botti maaliin, vain QA), etela2 ja m1-varmistus JU:n jonossa; p11d/p11e iPad; P-ajo peruttu. Kulkukartta vasta v133:n jälkeen.
- JU: iPad-takaportti käytössä; error 22 toistuu (tauot 09.25–09.35), yli 1 h → KK. Jonossa paljon Mac/iPad-ajoja.
- Äänittäjä: sai osoitinrivin uudesta 5.1:stä.
- PV: nollautuu 09.40 (luovutus d21c966c0, haara postivahti-luovutus-20261111-0938); PT lähettää aloitusviestin (docs/aloitusviestit/postivahti.md), sitten uusi PV nollaa PT:n.

## Työlista (tänään lisätty/päivitetty)
Pilvien varjot (VS), Kuumailmapallo liikkuu (NUI), Kiinnitetty kuumailmapallo (KS), Iso iPad: takaportti (JU, käytössä), Juoksupeli: piirron mittaus (vivut hyllyllä). Ison iPadin uudelleenkäynnistys = valmis.

## Muuta
- Asemataulu jäädytetty. Vahdit (odottajat, codex-posti) uusitaan 30 min välein.
- Opittu: älä yhdistä PR:ää ennen kuin testit valmiit (6567 meni pending-tilassa, onneksi vihreä).
