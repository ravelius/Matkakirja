# Äänittäjä: luovutus 12.11.2026 (kontekstivahti 31 %)

Haara koti/Matkakirja-aanittaja. Työkalut ja skriptit: /Users/Shared/Claude/proto-3d/_tyo/aanittaja-erat-20261112/ (ota-era.py, kuuntele-era.py + vanhat). Raamattu 5.1: puheäänitys alle 3 % ajoa KK:n luvalla; yksi otto per pala.

## Tehty 11.–12.11. (kaikki viety ja KK hyväksynyt)
- Petit Palais -luenta (v10), Pariisin isoisä (leikatut virketauot) + pulu pariisi-3 tageilla (aanet/kaupunki-intro-v3/), Pariisin 8 juttukappaletta (luennat v11, 9278 avainta).
- ERÄ 1 (pariisi loput, 8 palaa, 343,9 s): _valmiit/luennat-v1-vienti-20261112-era1/ ODOTTAA JU:n VIENTIÄ (v12, odotus 9286 avainta; viesti JU:lle lähti). Kun JU kuittaa: kerro KK:lle koottu viesti (portti, versio) jos ei jo.

## Seuraavaksi (KK 08.58 jatkotilaus; lähde NS: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/kertoja-viive/ei-valmiit/puuttuvat-kaikki.tsv; täydet tekstit NS:n scratchpadissa puuttuvat_nyt.json)
- Erät: 2 = lontoo 49 + GBR 15 (64 palaa, 28 717 merkkiä = 3,23 %), 3 = muu Eurooppa 72 (35 492 = 4,00 %). EI ARK (69) eikä ATA (12). KK:lle kerrottu: jaan 3 %:n ajorajan vuoksi 2a/2b ja 3a/3b (ellei KK sano toisin; odota vastausta ennen 2a:ta, tarkista viestit).
- Ajo: source ~/.zshrc (avain), `/opt/homebrew/bin/python3 -I ota-era.py 2a` (kuiva), sama + `--aja`; sitten `kuuntele-era.py 2a` (Gemini; "!!"-liput numeroeroista ovat väärähälytyksiä, tarkista alku/loppu), paketti _valmiit/luennat-v1-vienti-20261112-era2a/ → JU (manifesti v13..., kumulatiivinen edellisen päälle; MANIFESTI-ympäristömuuttuja osoittaa uusimman manifestin).
- Raportti per erä: YKSI koottu viesti KK:lle (määrä, pituudet, portti, manifestin versio, poikkeamat). Ennen jokaista ajoa tarkista avaimet uusinta manifestia vasten (ota-era.py tekee; avain = ALKUPERÄISESTÄ tekstistä, natiivin avainfunktio vain NFC).
- Pysyvä vertailutyökalu: NS tekee YHDEN toteutuksen (ennen-junaa-tarkistus + äänitysjono); minun pohjani (laske-pariisi.py, vertailu.py) annettu NS:lle: ei omaa työkalua.

## Opit
- Pyyntötie AINA elevenlabs_kieli.pyynto (pyyntöloki + kieli.json); ota-era.py käyttää sitä.
- Esiteksti "Tässä kerrotaan seuraavasta paikasta." nimellä alkaviin paloihin; with-timestamps-kohdistus on ~1 s pielessä → leikkauskohta = ensimmäisen hiljaisuuden loppu (−38 dB, 0,2 s, alku 1,6–3,2 s) − 0,07 s, 10 ms häivytys (ota-era.py).
- Roomalaiset numerot (Henrik VIII:n, XIV:n) ja "14. päivän" muunnetaan sanoiksi ennen ottoa (ota-era.py rooma()/paiva()).
- Isoisän virketauko ≤ 0,9 s: leikkaus raakaotoksesta (leikkaa.py). Tasaus keskitason mukaan (−17,2 dB).
- Soundly (kenkäleima): KK sanoo, kun omistaja valmis (kokoruudun lupa, etäyhteys); ei yrityksiä ennen sitä.
