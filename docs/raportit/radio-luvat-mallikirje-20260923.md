# Radioasemien lupapyynnöt: mallikirje ja avoimet kysymykset (23.9.2026)

Tilaaja on Fable omistajan kortin mukaan (23.9.2026 klo 20.4x: radio
hybridinä luokittain). **Kirjeitä ei lähetetä ilman omistajan erillistä
lupaa.** Asemalista ja perusteet ovat liitteessä
[lisenssi-inventaario-20260923-liite-radiot-hybridi.md](lisenssi-inventaario-20260923-liite-radiot-hybridi.md)
(kohdat 8.2 ja 8.3).

## Tilanne (päivitetty 23.9.2026 illalla)

- Omistajan tarkennus: luokat **sallittu ja epaselva soivat** natiivissa,
  **kielletty on linkki** ("Avaa aseman sivu"). Kokoelma `radiot` (skeema
  1.16): 115 maata. 17 maassa kielletyn yleisradion tilalla soi korvaava
  asema (`tools/vienti/radiokorvaavat.json`, lähde
  docs/raportit/radio-korvaavat-asemat-20260923.md), ja yleisradio jää
  toiseksi riviksi linkkinä.
- Luokat: korvaavista 5 sallittu (ByteFM, ORANGE 94.0, RaBe, BNR, 3RRR) ja
  12 epaselva; muut 98 maata epaselva; 17 yleisradiota kielletty.
- Nimi ja linkki aseman sivulle ovat sallittuja ilman lupaa. Logoja ei
  käytetä ilman aseman lupaa.
- Kun asema myöntää luvan, luokka muutetaan arvoon `sallittu`
  (`radiokorvaavat.json` tai `radioluokat.json`) ja peruste kirjataan.

## Lupapyyntöjen 20 asemaa

17 korvaavaa asemaa (luvan kuittaus nostaa epäselvän sallituksi ja varmistaa
sallitun) ja 3 Fogg-reitin tärkeintä epäselvää asemaa. Yhteys organisaation
yleiseen osoitteeseen tai lomakkeeseen.

| # | Maa | Asema | Luokka nyt | Sivu |
|---|---|---|---|---|
| 1 | AUS | 3RRR Triple R 102.7 (Melbourne) | sallittu | https://www.rrr.org.au/ |
| 2 | AUT | ORANGE 94.0 (Wien) | sallittu | https://o94.at/ |
| 3 | BEL | Urgent.fm 105.3 (Gent) | epaselva | https://urgent.fm/ |
| 4 | CAN | CFRO Vancouver Co-op Radio 100.5 (Vancouver) | epaselva | https://www.coopradio.org/ |
| 5 | CHE | Radio RaBe 95,6 (Bern) | sallittu | https://rabe.ch/ |
| 6 | DEU | ByteFM (Hampuri) | sallittu | https://www.byte.fm/ |
| 7 | DNK | Radio4 (Kööpenhamina) | epaselva | https://radio4.dk/ |
| 8 | ESP | Radio Vallekas 107.5 (Madrid) | epaselva | https://www.radiovallekas.org/ |
| 9 | FIN | Radio Helsinki 98,5 (Helsinki) | epaselva | https://www.radiohelsinki.fi/ |
| 10 | FRA | Radio Campus Paris 93,9 (Pariisi) | epaselva | https://www.radiocampusparis.org/ |
| 11 | GBR | Resonance 104.4 FM (Lontoo) | epaselva | https://www.resonancefm.com/ |
| 12 | HKG | D100 (Hongkong (internetradio)) | epaselva | https://www.d100radio.com/ |
| 13 | NLD | BNR Nieuwsradio (Amsterdam) | sallittu | https://www.bnr.nl/ |
| 14 | NOR | Radio Nova 99,3 (Oslo) | epaselva | https://radionova.no/ |
| 15 | PRT | RUC – Rádio Universidade de Coimbra 107.9 (Coimbra) | epaselva | https://ruc.pt/ |
| 16 | SWE | Radio AF 99,1 (Lund) | epaselva | https://www.radioaf.se/ |
| 17 | UGA | Bukedde FM 100.5 (Kampala) | epaselva | https://www.bukedde.co.ug/ |
| 18 | USA | WNYC-FM (New York Public Radio) | epaselva | wnyc.org (lomake) |
| 19 | IND | Aakashvani / All India Radio | epaselva | prasarbharati.gov.in (lomake) |
| 20 | EGY | Radio 9090 (Kairo) | epaselva | 9090.fm (lomake) |

## Avoin ennen App Store -julkaisua: Teosto ja Gramex

Suoran lähetyksen soittaminen maksullisessa sovelluksessa voi synnyttää
oman välityskorvausvelvoitteen, vaikka asema antaisi luvan. Tätä ei ole
ratkaistu. Omistajan päätöksen mukaan asia ratkaistaan ennen App Store
-julkaisua, ja kysymys lähetetään Teostolle ja Gramexille vasta omistajan
luvalla.

## Mallikirje (englanniksi; suomeksi Ylelle)

> Subject: Permission request: linking/playing your live stream in an educational travel game (Matkakirja)
>
> Dear [broadcaster] licensing team,
>
> We are Visuaaliviestinnän Instituutti Tampere Oy, a small Finnish studio
> making *Matkakirja ja unohdettu aarre*, an educational adventure game for
> teenagers and adults. Players travel the world following a grandfather's
> 1873 travel diary, and each country page offers a way to hear the
> country's own language and radio.
>
> We would like to ask for permission to play your public live stream
> [station, stream URL] inside our iOS app (a paid app on the App Store; a
> free web version also exists). What we would do:
> - play the live stream unchanged, directly from your own server, only
>   when the player presses "listen" on [country]'s page (no recording,
>   rebroadcasting, caching or advertising around the stream);
> - show the station's name and a link to your website; no logo unless you
>   allow it;
> - stop immediately at your request.
>
> If direct playback is not possible, we will only show the station name
> with a link to your own player, which we understand needs no permission.
>
> Could you tell us whether this use is permitted, and on what terms?
>
> Kind regards,
> [name], Visuaaliviestinnän Instituutti Tampere Oy
> [contact]

## Lähetysjärjestys (ehdotus)

Ensin 12 epäselvää korvaavaa asemaa (pienet yhteisö- ja opiskelijaradiot
vastaavat yleensä nopeasti), sitten 5 sallittua kirjallisen kuittauksen
vuoksi ja lopuksi USA, IND ja EGY.
