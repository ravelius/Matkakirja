# Karttaseppä: luovutus 10.11.2026 klo 23.00 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -2157:n (taustat: git show 9e91bee3f:docs/raportit/viesti-karttaseppa-luovutus-20261110-2157.md).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Tyyliohje (KK, sitova): /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-pariisin-nahtavyydet-tyyliohje.md
NÄKYVÄ TYÖ: karkea kuva KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a) suoraan, kopio PT:lle; junaan vasta KK:n katsottua. Ruudukko Tripo | koodi + kaukaa, ympäristö täynnä.
Worktree: /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna (remote natiivi-backup), nyt haarassa karttaseppa/nahtavyydet-1-1.

## TEHTY tässä sessiossa (22.48–23.00)
- KJ9 (d36a7c7a2 = 224.46) katsottu, loki puhdas. Parit KK:lle + kopio PT:lle: _tyo/karttaseppa/koodijuna/parit-kj9-d36a7c7a2/ (rajaus-{rk,nd}-kaukaa.jpg,
  pari-*). RK:n lähikuva hyvä; ND:n lähikuvat (lahi-nd, lahi-nd-b) EPÄONNISTUIVAT (kamera aukion tasolla, katto ei näy) → uusi ND-lähikuva puiston kanssa (KK:lle kerrottu).
- KK:n työnkulkukysymys (asemat 1–2, parametriset osat) vastattu PT:lle 22.5x.
- ND-PUISTO (224.47), haara karttaseppa/nd-puisto (= 6d82a050c + d7d781e53, pushattu): INFRA VALMIS: Koodimallit.Nakyy avain "+x" = vain koodilla
  (VainKoodilla), Nahtavyysalue.Maaritys.KoodiPuut + KoodiPuutAvain, puiden näkyvyys puu kerrallaan. 747/747, unity 0. DATA PUUTTUU:
  OSM-haku käynnissä (pid 1408, node hae-cite.mjs, T7:n planeetta, kaksi läpikäyntiä; Overpass kielletty robots.txt:ssä):
  _tyo/karttaseppa/koodijuna/nd-puisto/ (hae.log, → cite-osm.json). Kun valmis: `python3 tee-puisto.py cite-osm.json <Resources/NotreDameKoe>`
  (haara nd-puisto checkoutissa!) → nd-koodi-puisto.png(+meta), puut.txt, esikatselu.jpg; katso esikatselu, sitten notre-dame-Maaritykseen
  Lisapalat += new Pala { Kuva = "NotreDameKoe/nd-koodi-puisto", X/Y/Leveys/Korkeus tulosteesta, PoisKoodilla = Koodimallit.VainKoodilla(NdKoodi) },
  KoodiPuut = puut.txt-rivit, KoodiPuutAvain = NdKoodi. Väri VIHREA (178,172,108) arvio → tarkista kuvasta. Jos puisto puuttuu OSM:stä (Square Jean-XXIII on
  leisure=park), tee-puisto.py lopettaa "ei puistoja".
  HUOM: ND:n Tripo-pohja (pohja-ranta-vesi1) EI ole OSM-kohdistettu (~90 m pielessä), mutta uusi pala piirtyy KuvaLat/Lon-muunnoksella kuten talot ja koodimalli
  (tarkistettu nd-puisto/peitto.py). Irtotalot: way/53657341 (OSM presbytery 786,791 alueen px) = sakaristo, oikea; toinen tunnistamatta (katso uudesta lähikuvasta).
  Sitten KJ: ND kaukaa + aito lähikuva (lahizoomi, kallista ~50, malli ~1/3 ruudusta, katto näkyvissä) → KK.
- INVALIDIT b7c9414e8 (nahtavyydet-1-1, pushattu): kultainen kupoli (OsaRumpu + OsaKupoli InKulta 0xD4AF5E), katot 0x8E979D, kivi TaloKivi × 1,12,
  siipiin rytmi (InRytmi: pihan puolella kaarikäytävä + ikkunat, kadulla 2 ikkunariviä), Dômen ristirunkoon ikkunarytmi, osakirjastoon OsaKaarikaytava,
  PohjaPoisKoodilla invalides:Invalidit. 753/753, unity 0.
  Talot 1:1: _tyo/karttaseppa/koodijuna/raivaus-1-1-invalides/ (jalanjälki 65 308 m², raivaus 68 886 m², K 2 386 261 m²; 61 → 5 poistoa)
  → palat-v25-invalides-1-1 = palat-v25-pantheon-1-1 + 5 palaa. m² PT:lle EI vielä lähetetty (lähetä KJ11-raportin kanssa).
- KJ11 Invalidit JU:lle 23.0x (ajopyynto.md LISÄYS 23.0x, sk-mac-invalidit-kj11.txt, 9 kuvaa in11-tripo-* | in11-koodi-* + in11-koodi-lahi)
  → lokit/karttaseppa-invalidit-kj11-b7c9414e8. Katso täysikokoisena (kupoli kultainen kaukaa? kaarikäytävät? talot palanneet?) → ruudukko KK:lle, kopio PT:lle.

## AVOIMET (järjestys)
1) KJ10 Panthéon (b8fed770e) JU:lla → lokit/karttaseppa-pantheon-kj10-b8fed770e: tarkista ympäristö täynnä → pari pn8-koodi | pn10 KK:lle (+ PT).
2) KJ11 Invalidit (yllä) → KK.
3) ND-puisto data + KJ (yllä) → KK, sitten PT:lle 224.47-ehdokas (haara nd-puisto).
4) Opéra → Louvren piha + pyramidi → Sacré-Cœur → Sainte-Chapelle (kukin: PohjaPoisKoodilla, osakirjasto, raivaus resepti raivaus-1-1-invalides/
   tee-maskit.py 4 <kaikki aiemmat> <uusi>:<osm> + aja-palat.sh + kokoa.py edellisen version päälle; versioitu kansio).
   Opéra (tyyliohje): vain pääkupoli + 2 sivukupolia haalean kuparinvihreät, muut katot sinkinharmaat, näyttämötornin päätyyn kivinen kolmiopääty.

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min).
- OSM-haku: odota `grep tiet nd-puisto/hae.log` (pid 1408; jos kuollut ilman riviä, aja uudelleen taustalle: `node hae-cite.mjs cite-osm.json > hae.log 2>&1`).

## LISÄYS 23.1x (viestit nollauksen odottaessa)
- KJ9: KK hyväksyi vaalean kiven (224.46). KJ10 Panthéon: KK "näyttää oikealta → junaan"; PT: 224.47 = 321324163 (haara karttaseppa/pantheon-224-47 =
  b8fed770e + StreamingAssets/talot/pariisi.json v4). Paketti _tyo/karttaseppa/koodijuna/talot-paketti-pariisi-v4 (219 palaa, v3→v4 5 palaa 3,2 Mt, SHA256SUMS ok)
  JU:lle. AVOIN: kun JU kertoo paketin olevan ämpärissä → kirjoita /Users/Shared/Claude/julkaisija-tyokalut/linkki-224-uutta/224.47.palat-ok (kuten 224.46).
  HUOM: Invalidien palat (palat-v25-invalides-1-1) ovat Panthéonin päällä → Invalidien paketti on v5, --edellinen = v4 (321324163:n pariisi.json).
- KK:n Panthéon-huomiot seuraavaan kierrokseen (ei estä): aukiolle kevyt kiveys/reunaviiva; pylväiden välit mustat laatikot → tummanruskea seinä + yksi ovi.
- KK:n ND-ottoon (224.47-puisto): 1) aukiolla irtovarjoja ilman rakennusta (E/C-muoto, varjokaista) ja talon pohjan katkoviiva maassa (lahi-nd-b) →
  tarkista poistettujen talojen varjot/pohjat (talot poisto 1); 2) toinen kulma OIKEASTI eri suunnasta (b-kuvat olivat samat), kamera niin korkealla, että katto näkyy.
- Kyltit irti 1:1-mallista: NUI tekee (OhjelmaKohteet.KoodiMalli + Kylttikohde.TRajat, haara natiivi-ui/nahtavyys-paisuu) → KS katsoo ennen junaa.
  Sainte-Chapellen koko tiedossa (Tripo K 2), ei korjata.
