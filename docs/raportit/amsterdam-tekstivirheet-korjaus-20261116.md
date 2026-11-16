# Amsterdamin pelitekstien virhekorjaukset (SK 16.11.2026, KK:n päätös kohta 4)

Tila: data-PR LUONNOKSENA, KK lukee diffin ja antaa yhdistämissanan. Korjataan VAIN virheet, jotka tarkistus (docs/raportit/amsterdam-9-tarinapaikkaa-dataluonnos-20261116.md) osoitti; uusia tarinapaikkoja ei tässä PR:ssä. Sääntö lahteet-ja-tarkistus 11. Jokaisessa korjauksessa toinen lähde on itsenäinen (Wikipedian kieliversiot eivät laske).

Muutetut tiedostot: js/packs/fokusvirta-amsterdam.js (nostojen ja täkyjen lähdeteksti), js/packs/nahtavyysjutut.js (kohdekartan jutut, sanatarkka kopio), js/packs/kulttuuri-kategoriat.js (Kapein talo -nosto), js/packs/europe-kulttuuri.js (visa), data/aanitysjono.tsv (12 riviä, `tarkista.mjs --lisaa`). Testit: `npm test` 5871 läpi, 0 virhettä.

## Timanttihiomo ("Timanttikaupunki juuri sinä keväänä")

| Vanha | Uusi | Lähde |
|---|---|---|
| "kaupungin parhaana timanttivuotena" | "keskellä timanttinousua" | superlatiivi ilman lähdettä; Kaapin aika 1870-luvun alku (Diamantmuseum Amsterdam, Bronsema PIE-raportti 14) |
| "noin 1850 alkaen höyry" | "noin 1840 alkaen höyry" | Diamantmuseum (1840 ensimmäinen höyryhiomo) + PIE14 (1840 osin höyry, 1845 patentti) |
| "tuhat työntekijää vuonna 1848, tuhat neljäsataa vuonna 1860" | poistettu | vain nl-Wikipedia; PIE14: koko vaikea arvioida |
| "Etelä-Afrikan Kimberleystä alkoi vuonna 1870" | "Etelä-Afrikasta alkoi vuonna 1870" | Diamantmuseum (1870 ensimmäinen erä Etelä-Afrikasta) + PIE14 (Kaapin aika 1871); Kimberley löytyi 1871, nimi 1873 (Solomon, SA History) |
| "Boas aloittivat samana vuonna hiomon Nieuwe Keizersgrachtilla hevoskierron voimalla; kahdeksan vuotta myöhemmin he tilasivat höyrytehtaan, joka valmistui 1879 ja oli avatessaan Euroopan suurin" | "Boas perustivat noin samoihin aikoihin hiomon, jonka höyrytehdas valmistui 1879" | 1879: PIE14 + Gassan; "Euroopan suurin" (PIE14) ristiriidassa "maan suurin" (rijksmonument-perustelu) → pois; Keizersgracht ja hevoskierto vain nl-Wikipedia |
| "vuodesta 1875 länsimaiden talouskriisi pysäytti" | "1870-luvun puolivälin tienoilla" | 1875 vain nl-Wikipedia; Kaapin aika päättyi 1873/1876 (lähteet eroavat) |
| "yli kymmenentuhatta työntekijää, noin seitsemän kymmenestä juutalaisia" | "useita tuhansia työntekijöitä, joista suurin osa oli juutalaisia" | PIE14: 8 756 jäsentä 1910, 9 000 työntekijää 1920; "suurin osa" PIE14 + J. Kok (IISG); 10 000 = perheitä (diamantbewerkers.nl) |
| "kaksitoistatuntisia päiviä ilman taukoja" | "pitkiä päiviä" | vain PIE14 (60 h viikko 1895) |
| "maan ensimmäisen suuren ammattiliiton" | "oman ammattiliittonsa" | 1894: PIE14 + Kok; superlatiivi vain nl-Wikipedia |
| "Uilenburgerstraatilla, ja siellä hiotaan edelleen timantteja" | "Nieuwe Uilenburgerstraatilla, ja siellä on nykyään timanttitehdas, jossa järjestetään kierroksia" | katu PIE14 + Gassan; "hiotaan edelleen" vain markkinointisivu |

## Amsterdam-laiva ("Amsterdam makaa Englannin hiekassa")

| Vanha | Uusi | Lähde |
|---|---|---|
| "203 merimiestä, 127 sotilasta ja viisi matkustajaa" | "yli 330 ihmistä" | lähteet eroavat: 335 (Wikipedia, Sussex Smuggler) vs 333 (Shipwreck Museum Hastings, The Past, Maritime Executive, Scheepvaartmuseum) |
| "kaksikymmentäseitsemän arkkua hopeaa, arvoltaan noin kolmesataatuhatta guldenia" | "yli kaksikymmentä arkkua hopeaa" | 27 (Wikipedia) vs 28 (Scheepvaartmuseum, Sussex Smuggler, Life on the Edge, RCE); arvo vain RCE/nl-Wikipedia |
| "Kolme viikkoa yhtiö yritti" | "Runsaan kuukauden yhtiö yritti" | 26.1.–11.3.1749 (Sussex Smuggler + Hastings Independent Press): 44 päivää |
| "neljäsataa vapaaehtoista rakensi vuosina 1982–1990" | "satoja vapaaehtoisia rakensi 1980-luvulla alkaneessa hankkeessa" | Scheepvaartmuseum: yli 400, alku 1985, laituri 1991; Wikipedia: 1985–90, 300; nl-Wikipedia/RCE: 1982–90 |

Ei korjattu tässä PR:ssä (ei luku): "loput veivät ryöstelijät" (salakuljettajat veivät n. 50 harkkoa), "runko oli tallella, koska savi ei päästä happea" (kaksi kolmasosaa; mekanismi ei lähteissä), 1969 "vesi laski" (kaksi tarinaa: viemärityömaa) ja visan vastaava vaihtoehto.

## Yövartio ("Yövartiosta sahattiin palat pois")

| Vanha | Uusi | Lähde |
|---|---|---|
| "lakasta, joka poistettiin vasta 1940-luvulla" | "lakasta, jota poistettiin vuosina 1946–47 ja 1975–76" | Rijksmuseum Bulletin 1976 (Kuiper & Hesterman): 1946–47 vain osa vanhasta lakasta, uusi lakka lisättiin; 1975–76 loput; Rijksmuseum "Operation Night Watch: brittle varnish" |

Ei korjattu (ei tässä listassa; KK päättää erikseen): mitat 363×437 (Rijksmuseum 379,5×453,5 ja 379,5×436), "kaksi miestä" (NG: kaksi miestä ja lapsi), askelman reuna ja holvikaari (vain Wikipedia), "ainoa todiste" (Lundens), "oikea nimi".

## Kapein talo ("Verotettiin julkisivun leveydestä" → "Verotettiinko julkisivun leveydestä?")

| Vanha | Uusi | Lähde |
|---|---|---|
| "kuusi metriä syvä" (5 tiedostoa) | "viisi metriä syvä" | iAmsterdam, Het Kleinste Huis -talon oma sivu, DutchReview, amsterdamoudestad.nl; yksikään lähde ei sano 6 m |
| "kiinteistövero laskettiin julkisivun leveydestä, joten taloista tehtiin kapeita" | "kerrotaan usein, että … laskettiin …, mutta historiantutkijat epäilevät sitä. Joka tapauksessa … kapeita ja syviä" | Archined 2010 (lainaa Stadsarchiv Amsterdamia: julkisivuleveyden mukaista veroa ei kannettu; toisen käden viittaus) + tips-amsterdam.nl ("wat te simpel"); Oude Hoogstraat 22 on 1738/1768–1787 (Het Kleinste Huis, DutchReview), ei 1600-luvun verotalo; väite vain nl-Wikipediassa ilman viitettä. Legenda kerrotaan legendana (sääntö 5) |
| "Portaat ovat siksi jyrkät" | "Portaat ovat jyrkät" | "siksi" = veron seuraus |
| Visa (europe-kulttuuri.js): kysymys "Miksi … kapeita?" vastaus vero | "Mitä kapeiden kanavatalojen syyksi kerrotaan usein?", fakta legenda + epäily + 2,02 m | sama |

Oppitunti ("Miksi tavara kulkee ikkunasta", fokusvirta-amsterdam.js) ja visa-fakta saivat saman korjauksen (viisi metriä, legenda).

## Äänitysjono

`node tools/aanitysjono/tarkista.mjs --lisaa`: 12 riviä (nahtavyysjutut Kapein talo, Timanttihiomo, Amsterdam-laiva, Yövartio; takynostot Kapein talo ×3, Yövartio ×1; fokusvirta-takyt timantit ×2, voc-hylky ×2). Jonon tarkistus OK (puuttuvat 110, kaikki jonossa). Yhdistämissana KK:lta ennen mainiin viemistä.

## Pulu: sama virhe esigeneroiduissa vastauksissa

pulu-esigenerointi/KAUMAA/vienti/pulu/vastaukset/v1/NLD.json (+ fakta/era-17.txt ja muut esigeneroinnin lähdetiedostot) sisältää samat virheet (kuusi metriä syvä, 203/127/5, 27 arkkua ja 300 000 guldenia, lakka 1940-luvulla, Kapein talo -verokysymys). EI korjattu tässä PR:ssä: esigeneroinnin kääntö on Pelikoodarin/Pulu-putken asia. Rivi KK:lle.
