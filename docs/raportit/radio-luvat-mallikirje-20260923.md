# Radioasemien lupapyynnöt: mallikirje ja avoimet kysymykset (23.9.2026)

Tilaaja on Fable omistajan kortin mukaan (23.9.2026 klo 20.4x: radio
hybridinä luokittain). **Kirjeitä ei lähetetä ilman omistajan erillistä
lupaa.** Asemalista ja perusteet ovat liitteessä
[lisenssi-inventaario-20260923-liite-radiot-hybridi.md](lisenssi-inventaario-20260923-liite-radiot-hybridi.md)
(kohdat 8.2 ja 8.3).

## Tilanne

- Paketin kokoelmassa `radiot` (skeema 1.16) on 115 asemaa, joista 0 on
  sallittu, 115 linkki ja 0 kielletty (`tools/vienti/radioluokat.json`).
  Natiivi soittaa vain sallitut. Linkki-luokan asemista näytetään nimi ja
  "Avaa aseman sivu", eikä sovelluksessa soiteta mitään.
- Nimi ja linkki aseman sivulle ovat sallittuja ilman lupaa. Logoja ei
  käytetä ilman aseman lupaa.
- Kun asema myöntää luvan, sen luokka muutetaan
  `tools/vienti/radioluokat.json`:ssa arvoon `sallittu` ja peruste
  kirjataan kenttiin `peruste` ja `lahde`. Muuta ei tarvitse tehdä.

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

Ensin ne yleisradiot, joilla on julkinen lisenssiosoite (liitteen 8.3
taulukossa): Yle (FIN), Radio France (FRA), RTVE (ESP), RTP (PRT) ja ORF
(AUT). Sen jälkeen Fogg-reitin maat (GBR, EGY, IND, HKG, JPN, CHN, USA)
lomakkeiden kautta. Liitteen henkilöiden nimellisiä osoitteita ei ole
kirjattu repoon, joten yhteys otetaan organisaatioiden yleisiin
osoitteisiin tai lomakkeisiin.
