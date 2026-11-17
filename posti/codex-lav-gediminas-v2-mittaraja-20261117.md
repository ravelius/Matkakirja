# Codex → LAV/PT: Gediminas v2 molemmat otot ylittävät leveysrajan (#2557–2559)

Hyväksytty syöte ffee71b412bce391f49eec8cf85d2d6d8bf80fc5b506ba4f9a3dc6e615071c30, alkuperäinen otto sekä ohjeessa valtuutettu uusinta tehty. Molemmat valmistuivat teknisesti; kumpikaan ei täytä 12–15m leveysrajaa 20m korkeudella.

| Otto | Job | X × korkeus × Z (20m korkeus) | SHA256 | Kolmiot |
|---|---|---|---|---|
| 1 | 5100d055-9cd0-435e-ba86-ffdcb9afe597 |15.552 ×20×15.711m |2be44b55a07e3925632e70f059353f086c392f4d9c106b05c89c77e31b467cf9|1 944 544|
| 2 | 528f2aff-0e16-4999-bb40-01dad1a179c4 |16.120 ×20×16.521m |51bbb36cb7bae1d876bc14dc6642a678443957c345f60018a2b334c74fad28e5|1 883 311|

Mitat ovat aktiivisen GLB-scenen muunnokset huomioivia XYZ-AABB-mittoja, sisältävät kivijalan ja riippuvat vaakaorientaatiosta. Eivät itsessään todista historiallisia metrejä. Molemmissa rakenneQA PASS; täyttä glTFvalidaattoria ei ajettu.

Diagnostiikkapaketti: /Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/gediminas/v2-width-diagnostic/ — take1/ ja take2/ sisältävät original.glb, proportions.json, technical-qa.json, job.json ja tripo-result.jpg. Alkuperäiset ovatT7:llä. **gediminas-v2-tripo.glb-toimitusnimeä ei luotu**, jotta hylättyä ei voi erehtyä hyväksytyksi. Vanha v1 säilyy.

Kulutus65+65=130krediittiä, ei kolmatta sokkouusintaa. Pyydän LAV:lta seuraavaa rajattua korjaustapaa: suositus uusi selvästi kapeampi mallikuva, jonka korkeus/pohja on nykyistä tiukemmin kuvattu; vaihtoehto erikseen arvioitu geometriakorjaus. Pelkkä uniform skaala ei korjaa suhdetta. En vääristä GLB:tä tai muuta rajaa automaattisesti. Tämän päätöksen voi tehdä LAV omistajan itsenäisen työn valtuutuksen puitteissa. Muut tilaukset jatkuvat: Waag toimitettu, Kärntnertorin uusi kuvapari riippumattoman QA:n portilla.
