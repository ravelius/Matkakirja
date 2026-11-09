# Natiivi-UI: luovutus 9.11.2026 klo 10.46 (kontekstivahti 25 %; korvaa -0915:n, lue se ensin otsikosta "KESKEN" alkaen taustaksi)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870
(tili sami.reivinen@vvi.fi; tarkista osoitekirjasta). Kaikki koetta, EI JUNAAN ilman omistajan korttia. Mac-kuvat ensin PT:lle.
Arkki: scratchpad-skripti arkki.py (PIL; `arkki.py ulos.jpg sarakkeet otsikko kuva1 nimi1 …`), kopio esim.
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/426fd25a-1d9b-42ce-8708-8749df191502/scratchpad/arkki.py.

## PAIKKAPALKKI (osat 1–3 koodattu, todennus lähes valmis)
Haara natiivi-backup natiivi-ui/paikkapalkki = 91d517091, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-paikkapalkki.
- 6125c9852: Kartta.uss:stä puuttui sulje (osan 4 rebase) → koko tyylitiedosto putosi (Unity "Nested style rules"): lentokartta ei
  näkynyt, kartuscha valui yläreunaan. OPPI: tarkista unity.log:sta "uss (line" jokaisen USS-rebasen jälkeen.
- 0a74ccd0f: menolento ei ollut matkalento (matka-ehto laskettiin KaupunkiNakyma.Ohitan jälkeen) → 2,2 s ja sumea kartta. Korjattu.
- 91d517091: NS:n AjoEnnakko 6ad986961 yhdistetty (PT kuittasi).
- Mac 91d517091: ipad + iphone KATSOTTU OK (arkit lokit/nui-paikkapalkki-1-<koko>-91d517091/arkki-paikkapalkki-1.jpg, PT:lle kerrottu
  10.4x). iphone-vaaka p-6: skenaarion veto osui nostokuvaan → sk korjattu (`ui mac veto 300 0 160 120`), JU:lta pyydetty vain vaaka
  uudelleen samalla sha:lla. KESKEN: katso vaa'an p-6 (lokissa "pelaaja liikutti … ei paluuta"), tee arkki → PT (pari) → PT vie KK:lle.
- Huom: matkalennon huippu 0,0 km Ranskan tasolta (835 km) on oikein (NS: huippu 0 = kohde näkyy jo lähtökorkeudelta).

## FPV-NAPIT (PT 10.4x; koodattu, Mac-ajo JU:n jonossa)
Haara natiivi-backup natiivi-ui/fpv-napit = 8a9c891fc (pohja NS:n a88e3648b natiiviseppa/fpv-latauskuva), worktree
/Users/Shared/Claude/wt/proto-natiivi-ui-fpv-napit. Viat (NS:n ajo lokit/natiiviseppa-fpv-latauskuva-{pysty,ipad}/fl-2-lento.png): puhelimessa
yläpalkki näkyi, pallo peitti ⛰ + ☰, tietorivin ja Manuaalin; iPadilla kaksi ☰. Korjaus kuten astronautin kamerassa: LinssiUi.fpvTila
(FpvNakyma.Muuttui) → Tilarivi.NaytaPalkki/Valitsin.NaytaNappi/Karttaselite.NaytaNappi pois (PaivitaKehys), Topografian ryhmä top/right 12;
FpvNakyma.PalloYla 12+40+8, lukemarivi päättyy ennen palloa (right = Vali.M + KulmaKoko + Vali.S − turva). 0 virhettä.
Skenaario proto-3d/_tyo/natiivi-ui/sk-fpv-napit-1.txt (ipad + iphone pysty, fn-1 topo, fn-2 lento + `ui fpvnakyma` tila, fn-3 pois).
KESKEN: katso kuvat (fn-2: ei yläpalkkia, yksi ☰, pallo ei peitä mitään; fn-3 palkki takaisin) → pari VAIN PT:lle.

## Muuta
- Vanhat worktreet poistettavissa, kun ei tarvita: wt/proto-natiivi-ui-nostovalikko-juna223, wt/proto-natiivi-ui-nostovalikko.
- Unityn "ArgumentOutOfRangeException … SearchDatabase" esikatselun alussa on editorin oma, ei meidän (myös vanhoissa ajoissa).

## Lisäys 10.5x (PT ei kuitannut iPhone-arkkia)
- PT:n kohdat: 1) p-5a sumea → vastattu: 6ad986961 on mukana, huippu 0 oikein, p-5a kesken nousua (NS:n ennakko, jos pitää terästää).
  2) p-6 tyhjä vihreä = veto vei merelle → sk:ssa nyt `ui mac veto 0 -250 64 300` (kamera pohjoiseen maalle). 3) RANSKA-teksti
  pikkukartassa ei kuulu pohjaan; tarjottu lisättäväksi, jos PT haluaa (odottaa PT:n vastausta).
- JU ajaa paikkapalkki-1 x3 uudelleen 91d517091:llä (korvaa vaaka-pyynnön), sitten sk-fpv-napit-1. Seuraaja: katso kaikki p-6
  ("pelaaja liikutti", kartalla maata ja nimiä) → arkit PT:lle.
- PT 11.0x: kohta 1 annettu NS:lle (ennakko paluulennossa), kohta 3 ei nimeä (suunnitelman mukaan). Odottaa vain uutta ajoa.
- JU ketju BE: paikkapalkki-1 x3 → lokit/nui-paikkapalkki-1-<koko>-91d517091-3 (vaaka-2 vanhalla vedolla: ei raportoida), sitten fpv-napit-1 x2.
- 11.1x: NS ccbdaef0a (paluulennon ennakko ilman huippua) yhdistetty → paikkapalkki 818e32b61 (0 virhettä), sk:n sha päivitetty; JU:lta pyydetty BE-ketju tällä sha:lla (kansiot -818e32b61).
- PT 11.0x: tarkista p-5/p-6:sta, peittääkö RANSKA-kartuscha (vasen alakulma) kartan paikannimen (NS:n mp-3: Rocamadour). Kartuscha on junan 223 osa, nimikerros ei väistä sitä; jos peittää, ehdota PT:lle nimien väistöä kartuschan alueelta (Nimikerros, vrt. FpvNakyma.LisaVaraus).
