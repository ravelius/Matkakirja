# Palatsi V2 – vain pintakarttakorjaus #1104–1105

Natiivisepän 27.10. kuittaus hyväksyi V1:n rakenteen, 63 merkkiä, koordinaatiston, tasot, portaat, kulkuvaipan, tulkinnat ja tavoitekuvan. Koko palatsin lopullinen hyväksyntä jäi pintakorjausten taakse.

## Korjattu

Molemmissa saleissa harmaa epäsäännöllinen liuskekivi korvaa ruosteenpunaisen kalliokuvan. **Yläsaliin valittu sama kivi kuin alasaliin; tämä on tilauksen sallima tulkinta.** Kivilattia on matta, ei metallinen, eikä kartassa ole säännöllistä laatoitusta.

Alasalin yhteinen kiviseinämateriaali käyttää erikokoisia, epäsäännöllisiä tummia ja vaaleampia luonnonkiviä runsaine vaaleine laastisaumoineen ja kivien päälle levinneine laastipintoineen. Sama jaettu kivimateriaali esiintyy myös palatsin tulokäytävässä ja portaiden kivipinnoissa. Erillinen kalkkirappaus, holvi, puut ja rauta säilyvät. Seinään ei lisätä geometrisia kiviä tai displacementia.

## Säilytetty täsmälleen

V2 on tehty vaihtamalla neljän upotetun tekstuurin tavut suoraan toimitettuun V1-GLB:hen ja säätämällä näiden kahden materiaalin värikerrointa. Ei Blender-uudelleenvientiä eikä geometrian uudelleenrakentamista. Kaikki 25 geometrian puskurinäkymää (paikat, UV:t, normaalit, tangentit ja indeksit), meshien viittaukset, solmut, transformit ja 63 logiikkamerkkiä ovat tavuntarkasti samat. 3 196 kolmiota, 5 piirtoa, 5 materiaalia ja 7 tekstuuria. Tasot +3,4000001 / +7,5 m sekä lähteen ensimmäinen porrasaskelma säilyvät.

QA-v2/geometry-identity-v2.json sisältää riippumattoman uudelleenluvun vertailun. V1:n hyväksytty 4 285 kävelypisteen vertailu säilyy täsmälleen samalle geometrialle; uutta kulkuväitettä ei päätellä pelkästä renderistä. QA-kuvat on renderöity uudelleen juuri palatsi-v2.glb-tiedostosta samalla kameralla ja salien valoilla kuin V1. Ne ovat sisäisiä mallin tarkistuskuvia, eivät pelikuvia.

## Vastaanotto

Mallin tyyppi on maailman osa. palatsi-v2.glb on liikkumaton, ei animaatioita (MANIFEST.json: liike = ei liikettä).

Vanha palatsi.glb, kaikki V1:n tiedostot ja alkuperäinen havainnekuva säilyvät ennallaan. Tämä toimitus tuo vain v2-tiedostot samaan postikansioon. SHA256SUMS-v2 kattaa tämän erän; QA-v2/MANIFEST.json tukee yhteistä tarkistinta myös vanhan juurimanifestin rinnalla.

Natiiviseppä/PT arvioi pintakorjauksen. Lopullista palatsihyväksyntää, peli-integraatiota tai julkaisua ei ole tehty tämän toimituksen perusteella. Uusin erillinen tilaus 8965de38f9 vapautti muut linnaosat palatsin rakenteen hyväksynnän perusteella. Ne tehdään erillisinä toimituksina; vapautus ei ole palatsin pintojen V2-hyväksyntä. Kokki ja portinvartija ovat erillisen Tripo-session vastuulla.
