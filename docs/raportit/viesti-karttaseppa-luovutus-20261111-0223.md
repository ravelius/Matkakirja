# Karttaseppä: luovutus 11.11.2026 klo 02.23 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -0204:n (lue sen LISÄYKSET: `git show 4a39ad780:docs/raportit/viesti-karttaseppa-luovutus-20261111-0204.md`)
ja -0132:n taustat/työkalut (`git show 91be273d8:docs/raportit/viesti-karttaseppa-luovutus-20261111-0132.md` → -0105 → -0010: tyyliohje, worktree, testit).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna (nyt haarassa karttaseppa/sainte-chapelle-juna-v8, puhdas). Talopaketit: proto tyokalut/talot_paketti.py
(`python3 -I … pariisi <palat> <N> <ulos> --edellinen <edellinen hakemisto.json>`; ämpärin versionumeroa EI käytetä uudelleen).

## Junat
- 224.53 = 0964e62f0 (Louvre + Invalidit, talot v7 = palat-v28-louvre-invalides-1-1). JU ajoi/ajaa.
- EHDOKAS 8fdafec2e (karttaseppa/sainte-chapelle-juna-v8) = 0964e62f0 + Sainte-Chapelle oletukseen + talot v8 (palat-v29-sc1-1-1, KSC 1). PT:lle 02.3x.
- Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty.

## SEURAAVA TYÖ (KK 02.2x, sitova järjestys)
1) SACRÉ-CŒUR (ei junaan näin): a) raivaus kirkon omaan jalanjälkeen; eteläpuolen Square Louise-Michel jää NURMEKSI, rinteen korttelit takaisin
   (nyt sacre-coeur-alueen maski poistaa ~169 taloa, palat-lv.log; tee 1:1-maski raivaus-1-1-*/tee-maskit.py-reseptillä, sacre-coeur:<osm>,
   palat uusiksi aja-palat.sh-tyylillä KSC=1, sitten v30 = v29 + vain Montmartren palat). b) PORTAAT puiston mittoihin ja kiinni kirkon terassiin
   (nyt irrallinen, liian pitkä/leveä ramppi OhjelmaKohdePariisiSacreCoeur.cs:ssä) tai pois, jos eivät sovi. Mäen korkeutta EI tehdä.
   Kuvat: sk-mac-sacre-coeur-kj24.txt:n 006- ja 009-kulmat uudelleen (KJ26). HUOM: aja-kohde näkyy kuvan yläosassa → kirkko yläreunassa.
2) Sainte-Chapellen lähikuva korkeammalta (kaari 0,0035–0,004) KJ26:n kylkeen; ei estä.
3) F-JALANJÄLKI (Louvren pohjoispuoli, lv22-koodi-lahi-lansi vasen yläosa, myös KJ20): yksi rivi KK:lle, mikä talo puuttuu 3D:stä / mikä piirros
   ylimääräinen. OSM-talot laatikossa 48.8612–48.8648 / 2.3335–2.3395 kaikki paloissa (paitsi < 8 m² ja Louvren katetut pihat) → piirroksen lähde
   on maan rakennustaso; selvitä mistä se piirretään ja vertaa. Raivausta EI muuteta (1:1-maski ei ylitä Rivolia; tarkistus.jpg:n oranssi = vanha K 2).
