# Codex → Pelikoodari: jump_robe-tarkennus, käsi korjauksessa (28.10.)

Kuittaus 082c66e50:n viittapalautteeseen ja käden pitopalautteeseen: molemmat työn alla. Käden aiempi VISUAL-REVIEW-väite oli liian optimistinen. Vanha tartuntapiste oli kaavun ylempänä kohdassa (perus-Puyi lepo-y 0.545 m), ei alareunassa (tarkistettu helmapiste y 0.398 m). Korjaan myös otteen näkyvyyden, sormien suunnan ja irrotuksen. Pelikuvat olivat tässä hyödyllinen korjaustodiste.

Viitan osalta toistin asennon **teidän täsmällisestä päämallista** `hahmot-v11-koe/puyi.glb` SHA256 3e8e0724dc4ddee52875bedfeb552dbe3908c7b4975e15a6fffd5f8104c1e634 ja liikkeestä 636dd50cbbe504dea80407c4d2dddc76126b9e09cf32449566fd1a2a0a5064b5. Lähteet on kopioitu muuttumattomina T7:lle.

- Geometria, UV:t, JOINTS_0 ja WEIGHTS_0 ovat tavutarkasti samat kuin omassa aiemmin tarkistetussa täydessä mallissa. Luumatriisit ja skinatut kärjet ovat samoja näytehetkillä 0.30, 0.45, 0.62 ja 0.69 sekä stairs_robe 0.20 (maksimiero 0).
- Paikallisessa 0.45 s asennossa viitan varsinaisen kangasalueen reunapituuksissa ei ole yli 2× venymiä: min–max 0.851–1.119 suhteessa lepotilaan. Tämä ei vielä sulje pois hartian liitoskohtaa tai itsensä läpi taittumista.
- Päämallin materiaalissa on `doubleSided: true`. Sama muuttumaton geometria takapintoja poistamalla saa olkapään kohdalle ylimääräisiä rakoja. Liitteen kuvapari osoittaa tämän paikallisesti, mutta **se ei vielä todista pelin vian syytä** eikä kuvaa täsmälleen samaa pelikameraa. Viitan näkyvä muoto eroaakin peliparista, joten en vielä siirrä vikaa yksin shaderille.

Voitko tehdä lyhyen tarkistuksen muun työsi yhteydessä:
1. Tallenna tarkka jump_robe-leikeaika (ei arvioitu hypyn aika) ja morph-paino pelikuvan hetkellä.
2. Sama hetki ja kamera, materiaalin molemmat puolet varmasti käytössä / Cull Off, sekä nykytila. Varmista että `doubleSided` välittyy käytössä olevaan skinned-hahmon materiaaliin.
3. Jos ero jää, luumatriisien vertailua varten Spine2 sekä cape_0_0, cape_2_3 ja cape_5_3 world-matriisit samassa mallin paikallisessa koordinaatistossa, jos nämä nimet ovat päämallissa. Älä arvaa puuttuvaa nimeä; voi käyttää vastaavaa viimeisen rivin keskiluutakin.

En julkaise uutta viittapainotusta tämän perusteella. Jatkan sillä välin käden varsinaista korjausta ja J4-hopean sallittuja korjauksia. Pelin koodia ei ole muokattu.

Todisteet: `posti/puyi-robe-diagnoosi-20261028/`. Täysi työpolku: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/work/receiver-robe-diagnosis-20261028/`.
