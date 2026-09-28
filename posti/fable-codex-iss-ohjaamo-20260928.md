# MUUTOS 28.9.2026 klo 22.3x EEST — PÄÄIKKUNA ON PYÖREÄ KATTOIKKUNA

Omistaja sanatarkasti: "voisiko ennemmin käyttää sitä pyöreää ikkunaa ja rajata se lähelle? toimisi aika
hyvin vähän eri rajauksella pysty ja vaaka muodossa"

Tämä korvaa alla olevan "YKSI ISO trapetsinmuotoinen sivuikkuna" -kohdan: pääosassa on Cupolan PYÖREÄ
kattoikkuna tiiviisti rajattuna (ikkuna täyttää ruudun lähes kokonaan, pyöreä karmi ja sen pultit/kiinnikkeet
näkyvät reunoilla, trapetsi-ikkunoista korkeintaan kulmissa aavistus). Omat rajaukset PYSTY 1290×2796 ja
VAAKA 2732×2048. Kaikki muu pysyy: todella pimeä ohjaamo, auringonvalo pyöreässä pokassa erillisenä
kerroksena (mielellään valo eri kellonsuunnista), pienet vaihtelevat yksityiskohdat ja pieni lappu karmissa,
kerrokset ohjaamo / valo / heijastus / ikkunamaski.

---

# Päätoimittaja → Codex: ISS-ohjaamo (Cupola 3), pysty ja vaaka (28.9.2026 klo 21.5x EEST)

Omistajan tilaus sanatarkasti: "onko mitään mahdollisuutta tehdä ISS:stä näin hienoa? tuossa elää auringon
valo ikkunanpokissa. ainakin tuo että on todella pimeää ohjaamossa tuo tunnelmaa. codexilta voisi pyytää
vastaavan ohjaamon sekä vaaka että pystyversiota varten. voisi toimittaa nämä kuvat referenssiksi sävyjen
osalta. … myös nuo pienet vaihtelevat yksityiskohdat ovat hyviä sekä tuo pieni lappu ikkunan päällä. voisi
käyttää pelissä sellaista kuvakulmaa missä yksi iso ikkuna olisi pääosassa ja sivuikkunat näkyisivät vähän."

## Referenssit (VAIN sävyt ja tunnelma)
posti/fable-codex-iss-ohjaamo-savyreferenssi-1/2/3-20260928.jpg ovat ruutuja julkisesta mainosvideosta.
Niistä otetaan vain sävyt ja valo. Kuvia, logoa tai tekstiä ei kopioida peliin, ja kaikki grafiikka tehdään itse.

## Mitä halutaan
- ISS:n Cupola sisältä, mutta uusi kuvakulma: YKSI ISO trapetsinmuotoinen sivuikkuna on pääosassa ja
  horisontti ja maan kaari näkyvät sen läpi. Viereiset sivuikkunat näkyvät reunoilla vain vähän.
  Rakenne pysyy uskollisena oikealle Cupolalle (6 trapetsi-ikkunaa + pyöreä kattoikkuna), kun
  Cupola 2 -kuvasi olivat suoraan kattoikkunaan.
- Ohjaamo ON TODELLA PIMEÄ, ja ikkunan ulkopuoli on kirkas.
- Auringonvalo "elää" ikkunanpokissa: kapeat heijastukset ja reunavalo metallipinnoissa.
- Pieniä vaihtelevia yksityiskohtia (tarrat, ruuvit, kaapelit, kädensijat, merkintäkilvet) sekä pieni lappu
  ikkunan päällä (kuten referenssissä, oranssi/punainen, roikkuu karmista).

## Tekninen toimitus (peli animoi valon itse)
Erilliset kerrokset samassa rajauksessa, jotta peli voi liikuttaa auringonvaloa radan mukaan:
1. ohjaamo (pimeä sisusta, ikkuna-aukot läpinäkyvinä alfana)
2. auringonvalo pokissa (erillinen additiivinen kerros, mielellään 2–3 eri valonsuuntaa tai
   maski, jolla peli häivyttää valoa kiertoradan mukaan)
3. lasin heijastus/pöly (heikko, valinnainen)
4. ikkunamaski (valkoinen = ikkuna), jonka läpi peli piirtää maan.
Versiot: PYSTY (iPhone, 1290×2796) ja VAAKA (iPad, 2732×2048), PNG ja lähdetiedosto.
Kaksi vaihtoehtoa kuvakulmasta riittää, eikä varianttinippuja tarvita.

## Toimitus
Kuten Cupola 2 -kuvat (6bf83eee4): haara/PR tai ~/Documents/Codex/<pvm>/ ja ilmoitus tiedostoon
posti/codex-fable-iss-ohjaamo-20260928.md. Linssiseppä toteuttaa natiiviin, Siirtoseppä/Pelikoodari webiin.
Tämä liittyy samaan ISS-näkymään kuin säätöpaneelitilaus (posti/fable-codex-iss-saatopaneeli-20260928.md):
paneelin pitää istua tähän pimeään ohjaamoon.

— Päätoimittaja (Claude)
