# Codex → Pelikoodari: matalan esteen ylitys ja porrasjuoksu, 27.10.2026

Kaksi uutta liikettä kummallekin Puyille: `vault_low` ja `run_upstairs`. Paikallinen tekninen QA ja kuusi ruutua edestä, sivulta ja takaa yläviistosta kummastakin liikkeestä tarkistettu. Paketti `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/parkour-first-review-v1`. **Lisäpaketti tuonti-/pelikokeeseen, ei vanhan koko liikekirjaston korvaaja eikä peliin hyväksytty tulos.** Kysymys44de2de4 erillisestä leikeimportista on edelleen auki. Aiemmat liikkeet jäävät toimitettuihin paketteihin muuttumattomina.

GLB:t `models/puyi-perus-parkour.glb` (9.809Mt) ja `models/puyi-viitta-parkour.glb` (9.725Mt), vain T7:llä. Molemmissa sama oma hahmorunko ja tekstuurit sekä neljä leikettä: idle,run,vault_low,run_upstairs. Tekstuureja ei pienennetty;15Mt:n tiedostoraja säilyy.

**vault_low:**0,96s, ilmaosuus0,60s, root-käyrä JSON/CSV:ssä. Puolen metrin korkuinen ja syvyinen este kohdassaZ1,9–2,4m; koko kolmioverkko läpäisee462asennon törmäystestin. Tämä on syvempi kuin ilmoitettu0,3m:n pelieste. Sekä kengät että viitta mukana. LopussaZ4,8m ja run-vaihe1,824s. Ei käsitukea; vault_hand seuraa myöhemmin. Leike sisältää oman alastulon: älä lisää automaattisesti nykyistä land_soft-siirtymää0,12s ennen loppua arvioimatta päällekkäisyyttä. Yaw0; ei tavallista juoksusiirtymää juurikäyrän päälle.

**run_upstairs:** ohjeesi b0f280394 mukainen ylämäkijuoksu, viite0,16m nousu/0,32m etenemä (26,565°). Hahmon pääjuuri seuraa pelin kulkupintaa; luusto tekee mäkeen sopivan askelluksen ja vartalon kallistuksen. Ei askelkohtaista jalkalukitusta eikä kaavun nostoa. Silmukat perus0.657895s, viitta1.337719s, eri lähde-run-pituuksista. Älä kallista koko hahmoa uudelleen. Loivemmat portaat, siirtymät ja nopeus sovitetaan pelissä.

960Hz tarkistus: low-vaultn alin koko verkon piste vähintään0.149mm maasta; porrasjuoksussa vähintään0.629mm viitetason yllä. Porrasjuoksun silmukan alku/loppuero alle1e-6. Tämä ei korvaa peli-/kangastörmäystarkistusta. Vanha viitan kainalokorjaus pysyy avoinna.

PerusSHA `85c1cfeef1d1f10c5b268be90a3028fc7e7327d0cc63734b97aab833019a6f44`; viittaSHA `53cf3d04a93d06b5e115a2dda9194bf739828f15fde28f044b57ca049f2b0d44`. Ei uusia Tripo-/kuvakutsuja,0krediittiä. Jatkan käsitukiylitystä ja muita sallittuja jonotöitä.
