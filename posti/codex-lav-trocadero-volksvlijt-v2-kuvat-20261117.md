# Codex → LAV / KK: Trocadéro ja Volksvlijt v2-kuvat arvioitaviksi (#2572–2573)

Tilauksen 6561d83f45687133fa8981baa840a1060688f4be mukaisesti yksi kokonaan uusi kuva kummastakin on tehty. Edeltävät kolme Tripo-ottoa valmistuivat ensin (toimitus 3463fc304f). Kuvat ja lähdevertailuarkit on kopioitu Sharediin ja SHA-varmennettu. Shared-kansiot osoittavat T7:lle. Kaikki v1-kuvat ja -mallit säilytettiin muuttumattomina.

## trocadero-1878

- Uusi kuva: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/trocadero-1878/v2-review-original.png`
- Vertailuarkki: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/trocadero-1878/v2-review-sheet.png`
- SHA256: `7e4d72d3ed7ddb75a776f69914785da7d7faa0f03a5d8a110d4829b473dbc0e4`
- QA, lähteet ja prompti: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/trocadero-1878/v2-review-qa-2572-2573/`

Siivet ovat selvästi pidemmät suhteessa keskiosaan; kaarevat siivet ja molemmat päät säilyvät. Värisiluetin kuvaleveys/korkeus muuttui 3,66 → 5,11. Se ei ole 3D-leveys/torninkorkeusmitta.

Tilauksen 433 / 82,5 / 76,6 m ovat käytettyjä suunnittelutavoitteita. Dalyn alkuperäistä mittakohtaa ei nähty. Tutkimuksesta löytyi viite C. Daly, Les deux palais, p. 199 ja lainaus 82,50 m:stä, mutta se ei varmista 433 / 76,6 m:n lukuja. Takasivu ja kaaren syvyys jäävät osittain tulkinnaksi. Arkissa on aito PH2792-panoraama sekä sen rakennusrajaus.

## paleis-voor-volksvlijt

- Uusi kuva: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/paleis-voor-volksvlijt/v2-review-original.png`
- Vertailuarkki: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/paleis-voor-volksvlijt/v2-review-sheet.png`
- SHA256: `4c38ecf548c739d765c55b2652e1d8b67be4ad083cb454be7d2f0592c85ad501`
- QA, lähteet ja prompti: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/paleis-voor-volksvlijt/v2-review-qa-2572-2573/`

**VARAUS: pyydetyn lisäsyvyyden toteutuminen ei varmistu tästä kuvasta.** Sommittelu ja massa ovat edelleen lähellä v1:tä. En merkitse mittoja 126 × 81 × 64 m tai pituus/syvyys-suhdetta 1,55 toteutuneiksi.

Suosittelen syvyyden arviointia ennen Tripo-lupaa. Jos kuva ei riitä, mahdollinen seuraava korjaus kannattaa ohjata pohjapiirroksen ja karkean mittarungon avulla ilman v1-kuvan vahvaa vaikutusta. Nyt valtuutettu yksi kuva on tehty; ei automaattista uusintaa.

Nimetty [Vergeten Verleden](https://www.vergetenverleden.nl/volksvlijt.html) tukee mittoja 126 × 81 m. [Amsterdam op de kaartin rakennussivu](https://amsterdamopdekaart.nl/1850-1940/Frederiksplein/Paleis_voor_Volksvlijt) ilmoittaa 126 m leveyden ja 64 m korkeimman kohdan. Saman sivuston [Plan-Sarphati-yleissivu](https://amsterdamopdekaart.nl/c/78/Plan-Sarphati) sanoo 62 m. Ristiriita on kirjattu. Arkissa on aito Westeinde-valokuva ja historiallinen julkisivu/pohjapiirros V4.

## Hyväksyntä ja loki

Tuottajan/rootin kuvavertailu on tehty. Tämä ei ole riippumaton QA- tai KK-hyväksyntä. Kummallekin tarvitaan KK:n nimenomainen uuden SHA:n kuvasana ennen Tripoa. Toimitus on kuvakatselmuksen aineistoa; säilyttäkää v1:t nykyisessä käytössä.

Kaksi built-in ImageGen -kutsua, yksi per kohde; ei uusintoja tai CLI/API-fallbackia. Aloitus, valmistuminen, paikallinen generointitunniste, syötteiden SHA:t ja promptit ovat imagegen-input.jsonissa. Työkalu ei ilmoita euro-/tokenhintaa tai palvelun jobId:tä: arvot ovat null, ei väitettä maksuttomuudesta. Tästä parista ei tehty Tripo-ottoja eikä käytetty Tripo-krediittejä. Kaikki aineisto on T7:llä; raskasta paikallisrenderöintiä ei käynnistetty.
