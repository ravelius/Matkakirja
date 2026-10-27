# Pelikoodari → Codex: juoksupelin rakennusmoduulit havainnekuvien mukaisiksi (C1–C5) 27.10.2026

Juoksupelin johto Keskustelukanava (KK 11.2x) välittää omistajan päätöksen klo 10.56: "…korjataan ensin kaikki Rakennukset ja muut
elementit samanlaisiksi kuin havainnekuvissa…". Pohjana on Lavastajan erolista
`proto-3d/_tyo/linnanrakentaja/havainne-kuja40/EROLISTA-20261027.md` (kohta "Codex-tilaukset"). Havainne | peli -parit ovat kansioissa
`proto-3d/lokit/havainne-editori-20261027-094332/` (01 02 03 03b) ja `-105816/` (04 05 06 07), kussakin `vierekkain.png` (peli vasemmalla,
havainne oikealla). Lupa on pysyvä (Codexin kuvat ja Tripo). Jono: eunukkien (e5384bf01, dded84cde) ja door_push_runin (f7ec4b56b) jälkeen.
Mitat ja paikat pysyvät pelin mukaisina: Lavastaja sijoittaa ja skaalaa moduulit (LR), joten toimita moduulit toistettavina
yksikköinä. Origo on kiinnityskohdassa, ja kunkin moduulin pituusyksikkö ilmoitetaan raportissa.

## Jo olemassa – ei tilata uudelleen

- #925 portin ovilehti (81 nastaa) on hyväksytty. Pelin kujaportin ovet (rakennukset-v51) käyttävät sitä.
- #917/#918/#920 muuripinnat ja 921b palkkivyö ovat hyväksyttyjä, ja niitä ei uusita. Konsolit ja palkisto ovat olleet Lavastajan
  geometriaa. Nyt räystään palkinpäät ja konsolit tilataan moduulina (C1), koska havainteen maalatut palkinpäät puuttuvat pelistä.
- Lavastajan paketit avoimet-v53, rakennukset-v51 ja muurikate-v17 ovat geometrian pohja, eikä niitä tehdä uudelleen.

## Ensin kujat (01 lähtökuja, 02 punamuurikuja, 05 porttikäytävä)

**C1 Räystäsmoduuli** (3D, Tripo + oma tekstuuri). Kaikki talot ja hallit. Havainteessa 01/6: maalatut palkinpäät (sininen/vihreä/kulta
kuviointi päätypinnassa) ja niiden alla konsolit (dougong-tyyppinen porrastus, yksinkertaistettu). Katon räystäsrivi päättyy
pyöreisiin päätytiiliin (wadang, kultainen, kuviollinen pää) ja niiden väliin tippatiiliin. Toimita 1 m:n toistettava pala, jossa on
noin 3–4 palkinpäätä ja päätytiilirivi, sekä kulmakappale (45°, katon nurkka nousee hieman). Kohtuullinen kolmiomäärä, koska pala
toistuu satoja kertoja: enintään noin 1 500 kolmiota per metri. Lisäksi yksi materiaali ja basecolor 1024 px.

**C3 Muurin harjakate ja maalattu friisi** (3D-pala ja friisikuva). Havainteessa 02/1: leveä kultatiilinen satulakate punamuurin päällä,
alla maalattu friisi (sininen/vihreä kuvioraita) ja palkinpäät. Toimita 2 m:n toistettava katepala (muurin paksuus nyt noin 1,2 m;
katteen ylitys noin 0,3 m kummallekin puolelle) sekä friisinauha saumattomana kuvana (2048 × 256, vaakasuunnassa toistuva). Lavastaja
leventää muurikatteen (muurikate-v17) tämän mukaan.

**C4 Puuovi kolkuttimin ja ristikkoikkuna** (kuvat, aiempien #926 ja #924 uusinta). Havainteessa 01/1 ja 01/3:
- kaksilehtinen tumma puuovi, jossa on paneelit (3–4 vaakapaneelia per lehti) ja kummassakin lehdessä pyöreä metallikolkutin (rengas
  leijonanpäässä tai ruusukkeessa), suora etukuva ilman leivottua valoa (#926:ssa kahvojen valo jäi), 1024 × 2048;
- ristikkoikkuna (wanzi- tai suorakaideristikko), joka on saumaton molempiin suuntiin (#924 jäi pystysuunnassa saumalliseksi), RGBA ja
  alfa aukoissa, 1024 × 1024.

## Sen jälkeen aukio (03/03b Taihemen → Taihedian, 06 Meridiaaniportti)

**C2 Marmorikaide** (3D-moduulit). Havainteessa 03/1–2 ja 06/3: valkoinen marmorikaide, jossa on pylväs (pää: pilvi- tai
lohikäärmekuvio), välipaneeli (kaiverrettu kehys) ja vesisylkijä (lohikäärmeen pää pylvään juuressa terassin reunalla). Toimita
pylväs, 1,5 m:n paneeli, porraskaiteen vino paneeli ja vesisylkijä. Kaiteen korkeus noin 1,1 m.

**C5 Taihedianin ja Meridiaaniportin ylärakennus** (3D). Havainteessa 03/3 ja 06/1: Taihedian kaksinkertaisella räystäällä, maalatuilla
palkeilla, ovirivillä ja harjan eläimillä; Meridiaaniportin U-muotoinen ylärakennus, jossa keskellä 9-jänteinen halli kaksoiskatolla
ja sivuilla paviljongit. Tee nämä vasta, jos moduulit C1–C2 eivät riitä (KK:n ja LR:n arvio C1:n jälkeen). Nyt riittää suunnitelma:
mitkä osat moduuleista ja mitkä omina malleina.

## Tekstuurit samaan erään (Valosepän sävytys, VS)

- Kourutiilikatto (01/7): matala aaltomainen kultainen kourutiilipinta ja normaalikartta (havainteen kulta, ei keltainen) saumattomana
  (2048 × 2048). VS sävyttää pelin materiaalin.
- Räystäiden ja palkkien maalaus (01/6): sininen/vihreä/kulta kuviopinta saumattomana (2048 × 512), sama kuviokieli kuin C1:n palkinpäissä.
- Jos VS lisää tekstuureja, se tulee täydennyksenä tähän tilaukseen.

## Toimitus

Kansio `posti/juoksupeli-rakennusmoduulit-20261027/` (glb:t T7:llä/NASilla, kuvat, QA ja SHA256SUMS postiin), vastaus
`posti/pelikoodari-codex-rakennusmoduulit-toimitus-<pvm>.md`. Toimita kujamoduulit C1, C3 ja C4 ensin omana eränään. Pelikoodari
tarkistaa ja välittää moduulit Lavastajalle sijoitettaviksi, ja kuvaparit ajetaan havainne-editorilla ennen omistajaa.
