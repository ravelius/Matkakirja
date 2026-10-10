# Pulu NOR: raportti (pilviajo 10.10.2026)

- Vastauksia: vaihe 1 = 180 (36 kohtaa × 5), vaihe 2 = 382 (linkkitaso "Kerro lisää"), yhteensä 562.
- Kesto: noin 42 min (latauksesta koostamiseen; sis. agenttien ajon, 2 rinnakkain).
- Agenttien tokenit yhteensä: noin 1,91 milj. (vaihe 1: 8 erää, noin 0,78 milj.; vaihe 2: 5 erää, noin 1,13 milj.). Sonnet, effort low.
- Tarkistukset: `tarkista-era.mjs` vaihe 1 ja 2: 0 virhettä lopussa (agentit korjasivat käsitemäärävirheitä: V1 8.4, 16.1, 16.3, 18.3, 21.3, 24.2, 26.3, 35.2; V2 kohdat 51 ja 356). `tarkista-valmis.mjs`: 0 virhettä, 1 varoitus (Barentszin vastaus mainitsee "Kiinaan" meritietä etsittäessä; historiallisesti oikein, jätetty).
- Käsin korjattu pistokokeessa: Preikestolenin "noin 300 000 matkailijaa" poistettu (pyöreä luku ilman lähdettä, sääntö 5).
- Huomio: sisältöversio v625 oli poistunut ämpäristä; data ladattiin versiosta v647 (`SISALTO_VERSIO=v647`, lataa-data.sh muutettu parametrisoiduksi, oletus ennallaan). Agentit merkitsivät muistinvaraisiksi: gákti/poronnahka (18.3), Preikestolenin vaelluksen kesto, Pyhän Olavin tien reitti, Wergelandin vaiheet; näitä ei ole tarkistettu lähteistä.
- Faktojen 30 vastauksen pistokoe tehdään erikseen (tässä ajossa vain superlatiivi- ja pyöreälukuhaku).
- Paketti: `pulu-esigenerointi/NOR/NOR.json` (maat.json:n NOR-rivi päivitetty).

## Pistokoekorjaukset 10.10.

Päätoimittajan jatko-ohje (Sisältökirjurin pistokoe). Korjattu kaikki aiheen maininnat vaiheissa 1 ja 2, muita ei muutettu. Tarkistukset: tarkista-era.mjs 0 virhettä (V1 ja V2), tarkista-valmis.mjs 0 virhettä (sama Barentsz-varoitus), NOR.json koottu uudelleen.

1. **Dovrefjellin myskihärät** (vastaukset-1-7 kohta 31+ "Milloin ja miksi…", vastaukset-2-2 Norja-yleisvastaus, vastaukset-2-5 Dovrefjell ×2): ensimmäinen tuonti Grönlannista 1932 (10 eläintä), kanta tuhoutui toisen maailmansodan aikana, nykykanta (noin 200–300) polveutuu 1947–1953 tuoduista vasikoista; "Euroopan ainoa pysyvä kanta" → "Euroopan merkittävin myskihärkäkanta". Härjedalen-lisäystä ei lisätty, koska yksikään vastaus ei väittänyt, ettei muualla ole kantaa.
2. **Eidsvollin kartano** (vastaukset-1-3 ja vastaukset-2-2 Carsten Anker): osto 1837, lahjoitus valtiolle 1851 ("kauppa vahvistui 1851" poistettu).
3. **Kjeragbolten** (vastaukset-1-3 ja vastaukset-2-2): jako "241 m + 735 m" poistettu; nyt "noin viiden kuutiometrin lohkare juuttuneena vuorenhalkeamaan noin 984 metriä Lysefjordin yläpuolella, alla lähes pystysuora pudotus".
