# Työkalu 2, KK 23.32 (Valoseppä 15.11.2026 klo 00.0x)

## A) Kynnys 1,10 + luonnollinen sovitus kaistalla 1,10–1,25 (TEHTY)
- SOVITUS: kirkko_min_sivusuhde 1,10; luonnollinen_alle 1,25; max_ylitys 2 m (malli pienenee 3 %:n askelin, kunnes ylitys ≤ 2 m); min_mittakaava 0,7.
- Lisäys: jos pinta-alan kokoluokka jää alle 0,7, kokeillaan yhtä pienempää (keski → pieni, suuri → keski); säännössä näkyy "luonnollinen: keski → pieni".
- Reseptiin kentät sovitus (pohja | luonnollinen), mittakaava, ylitys, parametrit. Mallimitat MALLIMITAT (torni mukana).
- PARIISI: 44 kaistan kirkkoa → 26 malliin (mittakaava 0,71–1,24; 16 pienempään kokoluokkaan), 18 ei sovi. Alle 1,10: 25 ei sovi.
  Kaikkiaan 410 malliin, 233 ei sovi (oli 395 / 248).
- LONTOO: 96 kaistan kirkkoa → 47 malliin (0,70–1,31; 41 pienempään), 49 ei sovi. Alle 1,10: 85. Kaikkiaan 894 / 455.
  Lontoon ei sovi -määrää kasvattaa nimilistasääntö: 189 asemaa ja palatsia ilman Lontoon listaa.
- HUOM: mittakaava voi olla yli 1 (enintään 1,31), eli kirkko on mallia suurempi. Ehdotan ylärajaa 1,2, jos KK haluaa.

## C) Pylvästemppeli tyypiksi (TEHTY)
- NIMILISTAT: Madeleine (katto harja), Palais Brongniart (katto attika); reseptin parametrit-kentässä. Madeleinen käsikorjaus poistettu (lista korvaa).

## B) Nimilistat (TEHTY)
- ASEMAT: Austerlitz ja l'Est hyväksytty (halleja 1). Nord, Saint-Lazare ja Lyon: ei sovi, "odottaa: halleja-parametri", kunnes KK hyväksyy rivin E.
- PALATSIT: 12 nimeä listalla, ei sovi: "odottaa: palatsin sovitus / umpipiha", kunnes KK hyväksyy rivin D.

## D) Palatsien sovitus + umpipiha (KUVAT: palatsit-1.jpg, luonnos-4 rivi 9)
- TyyppiPalatsiPiha(pituus, leveys, siipi 16): neljä siipeä, mansardit, kulmapaviljongit 20 m, risaliitti ja porttiholvi +z:lla. Lyhyt sivu < 2,6 × siipi
  (41,6 m) → tanko (Crillon). Ikkunajako harvenee isoissa: 1 263–1 359 kolmiota, Crillon 611.
- Sovituskuva: umpipiha osuu Hôtel de Villeen, Marineen ja Luxembourgiin. Bourbonin ja Élysée'n OSM-pohja on L-muoto, joten yksi siipi jää
  pohjan ulkopuolelle. Ehdotus: niissä piha = ei puuttuvalla sivulla (parametri avoin_sivu) tai ei sovi; KK päättää.
- Venytetty tanko on kaikissa 2–4 × leveä laatikko, joten piha on oikea suunta.
- Pääjulkisivu (+z) ei vielä tiedä katupuolta: suunta pitää valita pohjan pitkältä sivulta, joka on lähimpänä katua (KS:n katudata). Avoin.

## E) Asema, parametri halleja 1–3 (KUVA: luonnos-4 rivi 10)
- TyyppiAsema(halleja, pituus, leveys): hallin leveys = leveys / halleja, nousu 0,3 × hallin leveys (≤ 18 m), ripojen väli kasvaa pitkillä halleilla.
  Oletus (1, 156, 60) = luonnos 1:n asema (428 kolmiota). Nord 2 hallia 688, Saint-Lazare 3 hallia 868, Lyon 3 hallia 868.
- Julkisivurakennus (20 m) jää 27 m:n hallien taakse pieneksi; leveillä asemilla voisi nostaa julkisivua. Avoin.

## F) Ikonisäde (vain lista ja ehdotus, ei muutettu)
Säde piilottaa nyt (ohitetut-*.tsv "ikoni"):
- Pariisi: Panthéon, Sacré-Cœur, Orsay, Invalides ×2 (Saint-Louis, Dôme), Palais de la découverte (Grand Palais), Notre-Dame, Sainte-Chapelle,
  Palais du Louvre ja Gare du Musée d'Orsay: nämä OIKEIN (ikonin oma rakennus).
  VÄÄRIN: Temple de l'Oratoire du Louvre (way/30622528, erillinen kirkko Rue Saint-Honoré) ja Palais Royal (relation/3300400, 143 × 137 m).
- Lontoo: Abbey, St Paul's, Kensington Palace, Westminster, Buckingham OIKEIN. Tarkistettava: St Margaret's Church (way/54486345, Abbeyn vieressä)
  ja Chapel of St Peter ad Vincula (way/369136658, Towerin muurien sisällä; kuuluuko Tower-malliin?).
- EHDOTUS: ohitus vain, kun ehdokkaan pohja leikkaa ikonimallin pohjan. Ikonin pohja = koodimallin verkon XZ-rajat (Verkko.MinX…MaxZ) ikonin Lat/Lon-
  pisteessä ja kierrossa. Toteutus: Luonnos.dll vie ikonien rajat json:ksi → tyypitys.py leikkaustesti. Kierron lähde tarkistettava OhjelmaKohteet-
  kytkennästä (Unity-puoli). Palais Royal sen jälkeen umpipihapalatsiksi (143 × 137, piha = kyllä).
