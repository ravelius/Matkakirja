# Codex → PT / KK: karkuteillä v7 — omistajan hyväksymä mutainen kengänjälki roiskeineen

Omistaja hyväksyi tässä chatissa v7-roiskeversion: ”nyt loistava!” vastauksena kuvan näyttöön ja hyväksymispyyntöön. Aiempi suora toimitusohje oli ”tuo on hyvä, voit lähettää tämän version Claudelle”. V6:n lähetys keskeytettiin ennen R2-/postitoimitusta, koska omistaja pyysi vielä roiskeita. **Toimitettava ja hyväksytty lopullinen versio on v7**, SHA-256 `ee789ef9f4c60205ee2fdaf6d6bf84fea914d3cc6a0ed6598f4ab7b821988603`.

## Toimitettava tiedosto

`posti/juoksupeli-otsikko-814-20261021/02-karkuteilla.png`

- Muuttamaton native-PNG, 2060 × 763 px, RGBA, oikea läpinäkyvyys, 1 590 629 tavua.
- Täsmällinen teksti **karkuteillä**, tummat kirjaimet, ä-pisteet ja i-piste. Kengän kanta, holvikaari ja kärki erottuvat katkollisesta pohjakuviosta; ympärillä on mutaroiskeita.
- Omistajahyväksyntä koskee juuri tätä tiedostoa. Vanhoja puhtaan pohjan, negatiivikirjainten tai roiskeettomia versioita ei pidä ottaa käyttöön tämän sijasta.
- R2: https://media.matkakirja.app/juoksupeli/otsikko-814-20261021/02-karkuteilla-mud-splashes-v7.png
- R2:n HTTP 200, image/png, CORS ja koko tiedoston SHA-/tavutarkistus on varmennettu.

QA, hyväksyntä, lähdepin, kutsuhistoria, käytetty prompti, R2-kuitti ja koekuvat ovat kansiossa `posti/juoksupeli-otsikko-814-20261021/karkuteilla-v7/`. Koekuvat #807:n ja #809:n päällä käyttävät 20 asteen kiertoa: ne näyttävät läpinäkyvyyden ja luettavuuden, eivät määrää pelin lopullista sijoittelua tai animaatiota. Valkopohjainen koekuva on vain katselua varten; käyttöön tulee läpinäkyvä pää-PNG.

## Rajaus ja jäljitettävyys

Lähde on PT:n `paatoimittaja-codex-juoksupeli-otsikko-814-20261021.md`, commit `fc74d8af009140fd74a1bd5e9c560825aeb00640`, sekä sen jälkeen annetut omistajan suorat korjauspyynnöt. Kengänjäljestä tehtiin kaikkiaan seitsemän kokonaista generointia; kukin uusi korjaus seurasi omistajan pyyntöä. Alkuperäisen kahden otsikkoassetin tilauksen kokonaiskutsumäärä on kahdeksan. Tässä toimitusvaiheessa ei generoitu eikä muokattu kuvaa.

Tämä erä toimittaa vain tehtävän #825 hyväksytyn kengänjäljen. **#824 Viimeinen keisari -otsikko ei sisälly erään**, ja sen paikallinen luonnos säilyy erillisen omistajahyväksynnän takana. Vanhaa lähettämätöntä kahden kuvan toimitussuunnitelmaa ei käytetty.

Pelikoodarin aiemmin määritelty tekstiboksin poisto, otsikon ja kengänjäljen ajastus, kierto sekä askelääni ovat erillistä runtime-työtä. Tässä tehtiin kuvatoimitus; peliä ei muutettu eikä julkaistu. Vastaanottajan kuittaus ja toteutettu runtime-kytkentä kirjataan erikseen.
