# Materiaaliarkit 16a–c / #1989–1991 — toimitus

Karttasepälle ja KK:lle: kolme uutta materiaaliarkkia, yksi ImageGen-otto kustakin. Lähde `posti/karttaseppa-codex-materiaaliarkit-20261104.md`, commit `12d6fb526dfb4d0a19a21266fcfdfb2f0942c320`, blob `e6409ea3da66bce3926221e0d76c3d7e5afdd4f3`. Kaikki kolme TILAUS.md:tä ja 18 manifestitiedostoa luettu/tarkistettu.

**Kaikki kolme ovat 1254 × 1254 RGB PNG -natiiveja.** Pyydettiin 2048 × 2048, mutta työkalu palautti tämän koon; käytetään ohjeen sallimaa natiivineliötä. Ei skaalausta tai muuta jälkimuokkausta. Kukin paketti sisältää PNG:n, huomiot.md:n ja SHA256SUMS-tiedoston. Kaikki yhdeksän tiedostoa luettu toimituscommitista ja SHA256-varmennettu sekä kopioitu tavuntarkasti lähdekansion `_review-materiaali-…/`-kansioon.

| Tilaus | Paketti | Yksittäisen taloyksikön otantaleveydet |
|---|---|---|
| #1989 | [materiaali-bulevarditalot](https://github.com/ravelius/Matkakirja/tree/a2f8d5883f12da936b7e48e07d88acdb6a9543c1/posti/codex-karttaseppa-materiaali-bulevarditalot-20261104) | 41.6 ja 39.8 px |
| #1990 | [materiaali-vanha-sokkelo](https://github.com/ravelius/Matkakirja/tree/3479cb39912cc4efb29f29fdc081fe71d0fc19a2/posti/codex-karttaseppa-materiaali-vanha-sokkelo-20261104) | 34.0 ja 25.3 px |
| #1991 | [materiaali-matala-laita](https://github.com/ravelius/Matkakirja/tree/82c38f31fad28f2d449bba79d377b3646692a770/posti/codex-karttaseppa-materiaali-matala-laita-20261104) | 29.8 ja 35.2 px |

Leveydet ovat kaksi käsin valittua erotettavan julkisivu-/kattoyksikön mittausta natiivikuvasta, noin ±4 px epävarmuudella; eivät koko korttelin leveyksiä tai kaikkien talojen keskiarvoja. 2029×4 ja tulos on tarkastettu myös vierekkäisistä natiivipikselirajauksista.

**Saumattomuus ei läpäissyt yhdessäkään arkissa: sekä vasen–oikea että ylä–ala vaativat korjausta.** Kujia ja taloviivoja katkeaa liitoskohdissa. Ohjeen mukaisesti toimitetaan silti Karttasepän koodikorjaukseen. Ei lisäottoja.

Bulevarditalojen pitkät rivit toteutuivat, mutta kaikki näkyvät julkisivut eivät vastaa 5–7 kerroksen tavoitetta. Sokkelo on epäsäännöllisempi ja siinä on myös ruskeita kattoja; matalassa laidassa on väljempää vaaleaa maata ja matalampia taloja. Julkisivut ja yksityiskohdat korostuvat kaikissa 2029:ää enemmän. Täsmällistä talomittakaavan ja kuvakulman vastaavuutta ei ole hyväksytty; KK arvioi rinnakkain kuten lähde ohjeistaa.

Oma QA on tehty ja poikkeamat kirjattu; **kokonais-QA ei täysin läpäissyt**. Vastaanottajan hyväksyntä, saumojen koodikorjaus, runtime-integraatio ja julkaisu ovat erillisiä, varmentamattomia. Ei junaan.

Työkansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-materiaali-1989-1991-20261104`. Natiivit ja mittaukset kohdekohtaisissa kansioissa. Täysi kehotejoukko: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-materiaali-1989-1991-20261104/prompts.json`. Työkalu: sisäänrakennettu image_gen, uudet generoinnit neljällä tyyliviitteellä.
