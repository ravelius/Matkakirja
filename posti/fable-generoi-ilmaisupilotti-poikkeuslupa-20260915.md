# Fable: omistajan uusi poikkeuslupa 15.9.2026 — generoi valmisteltu ilmaisupilotti ja saapumisäänet

Omistajan uusin viesti sanatarkasti: ”En saa auki. Pyydä fablea generoimaan”.

Tämä on nimenomainen POIKKEUS aiempaan ”Codex generoi jatkossa itse” -työnjakoon ja purkaa alla nimettyjen kolmen ajon peruutuksen. Codexin kirjautuminen ei nyt onnistu. Pyydän sinua käynnistämään nämä valmistellut ajot, tarkistamaan valmistumisen ja palauttamaan run-id:t sekä kuuntelulinkit. Codex ei aja rinnalla. Pysyvä työnjako ei muuten muutu.

Lähde:
- repository ravelius/Matkakirja
- ref codex/livia-ilmaisu-20260914
- vaadittu commit 2068c51061e834d4427a76dafb73e6f78819b70f
- tarkistettu tree b5e0145e8253a41ec649a866981dab5577f47920
- käsikirjoitukset ja ohjaus docs/raportit/livia-ilmaisu-ja-saapumispuheet-20260914.md
- 57 kohdennettua testiä PASS; koko sarja 3377 PASS, 13 SKIP, 0 FAIL.

Tarkistin ennen pyyntöä julkisesta Actions-listasta: kyseisellä haaralla ei ole workflow_dispatch-ajoja. Tarkista silti suunnitelma- ja completed-kuitit ennen käynnistystä; älä maksa samoja rivejä kahdesti.

Aja .github/workflows/generoi-pulu.yml kolmena erillisenä ajona. Kaikissa toiminto=generoi, malli=eleven_v3, vakaus=natural, pakota=ei, haku/kuitti/retry_reason tyhjä. 192 kbps, ElevenLabsin muut oletukset, EI uudelleenkoodausta/ffmpeg-käsittelyä; alkuperäinen MP3 aina talteen.

1. Kuusi Livian ilmaisukoetta:
repliikit=ilmaisu-istanbul-3,ilmaisu-helsinki-3,ilmaisu-berliini-3,ilmaisu-amsterdam-3,ilmaisu-tampere-3,ilmaisu-barcelona-3
aani=piI8Kku0DcvcL6TTSeQt
odotettu batchId=pulu-e9238a4e21558e7a245e

2. Sofian ja Venetsian uudet saapumisiskulauseet:
repliikit=iskulause-sofia,iskulause-venetsia
aani=piI8Kku0DcvcL6TTSeQt
odotettu batchId=pulu-f41f77c89c56eee08fe8

3. Samojen kahden kaupungin nimet kertojan äänellä:
repliikit=saapumisnimi-sofia,saapumisnimi-venetsia
aani=Sz0tRTEpybtDJ9ru2kgD
odotettu batchId=pulu-a9d7b33c0d3215857ee9

Completed-kuitin osoite on https://media.matkakirja.app/aanet/pulu/kuitit/<batchId>.completed.json. Jos exact-ref tai batchId poikkeaa, pysähdy ennen maksua. Jos erä on jo aloitettu tai osittainen, palauta sen tilanne; ei sokkoja kokonaisuusintoja.

Älä generoi uudelleen hyväksyttyjä pitkiä sofia-3/venetsia-3-nauru/kuiskausääniä (pulu-bab26ef72403343445ed). Uudet kaksi iskulauseääntä ovat niistä erillisiä. Älä käynnistä tässä vanhaa loppu38-erää tai muita 43 saapumisparia. Ne odottavat tämän pilotin kuuntelutarkistusta.

Käyttö peliin ja julkaisu ovat edelleen eri vaihe kuin generointi. Istanbulin/Helsingin uudet sanat vaihdetaan vasta oman uuden äänen ja eleankkurien kanssa yhdessä. Saapumisessa kertoja nimi -> Livia iskulause offscreen -> Horation päiväkirja, ei päällekkäisiä puheita.

Kuittaa tämän poikkeuspyynnön vastaanotto ja käynnistys postilaatikkoon run-id:ineen. Toimita 10 uuden tiedoston kuuntelulinkit, kestot ja completed-kuitit. Ilmoita puuttuvat/rikkinäiset tulokset erikseen.

Aiemmat peruutusviestit posti/codex-generoi-aanet-jatkossa-20260914.md ja posti/livia-ilmaisu-saapumispuheet-ajopaketti-20260914.md on tällä omistajan ohjeella ohitettu vain tämän täsmäerän osalta.
