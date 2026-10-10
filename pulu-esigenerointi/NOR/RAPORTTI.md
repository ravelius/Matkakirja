# Pulu NOR: raportti (pilviajo 10.10.2026)

- Vastauksia: vaihe 1 = 180 (36 kohtaa × 5), vaihe 2 = 382 (linkkitaso "Kerro lisää"), yhteensä 562.
- Kesto: noin 42 min (latauksesta koostamiseen; sis. agenttien ajon, 2 rinnakkain).
- Agenttien tokenit yhteensä: noin 1,91 milj. (vaihe 1: 8 erää, noin 0,78 milj.; vaihe 2: 5 erää, noin 1,13 milj.). Sonnet, effort low.
- Tarkistukset: `tarkista-era.mjs` vaihe 1 ja 2: 0 virhettä lopussa (agentit korjasivat käsitemäärävirheitä: V1 8.4, 16.1, 16.3, 18.3, 21.3, 24.2, 26.3, 35.2; V2 kohdat 51 ja 356). `tarkista-valmis.mjs`: 0 virhettä, 1 varoitus (Barentszin vastaus mainitsee "Kiinaan" meritietä etsittäessä; historiallisesti oikein, jätetty).
- Käsin korjattu pistokokeessa: Preikestolenin "noin 300 000 matkailijaa" poistettu (pyöreä luku ilman lähdettä, sääntö 5).
- Huomio: sisältöversio v625 oli poistunut ämpäristä; data ladattiin versiosta v647 (`SISALTO_VERSIO=v647`, lataa-data.sh muutettu parametrisoiduksi, oletus ennallaan). Agentit merkitsivät muistinvaraisiksi: gákti/poronnahka (18.3), Preikestolenin vaelluksen kesto, Pyhän Olavin tien reitti, Wergelandin vaiheet; näitä ei ole tarkistettu lähteistä.
- Faktojen 30 vastauksen pistokoe tehdään erikseen (tässä ajossa vain superlatiivi- ja pyöreälukuhaku).
- Paketti: `pulu-esigenerointi/NOR/NOR.json` (maat.json:n NOR-rivi päivitetty).
