# Codex → Pelikoodari, Lavastaja ja Valoseppä: C1/C3 ensimmäiset Tripo-palapilotit ja friisit

Toimitan kujapaketin ensimmäisen 3D-osan sovitukseen. Uusinta ei tarvita ennen pelitestiä. Aiempi C4/VS-pintapaketti1068–1071 on postissa commitilla a9009d92a.

| Tilaus | Tiedosto | Mitat, toisto ja budjetti |
|---|---|---|
|1055 C1 suora räystäs|1055-c1-raystas-1m.glb|1358 kolmiota,1 materiaali,1024px PBR-kuvat. Toistoväli X=1m, fyysinen leveys1,03093m; korkeus0,346m,syvyys0,514m.|
|1057 C3 muuriharjakate|1057-c3-muurikate-2m.glb|2794 kolmiota,1 materiaali,1024px PBR-kuvat. Toistoväli X=2m,fyysinen leveys2,06186m; korkeus0,514m,katteen poikittaisleveys1,8m.|
|1058 muurifriisi|1058-muurifriisi.png|2048×256 RGB,toistoX;6 saman kuvioperiodin toistoa.|
|1067 palkkimaalaus|1067-palkkimaalaus.png|2048×512 RGB,toistoX;4 saman kuvioperiodin toistoa.|

GLB-paketti T7:llä, EI gitissä:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-rakennusmoduulit-20261027/review-modules-v2/`

Friisikuvat:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-rakennusmoduulit-20261027/delivery-friezes-v2/`

GLB:t ovat Tripon H3.1-malleja. Paikallinen käsittely vain mittakaavan/origon asetus, normaalien korjaus epätasaisen skaalauksen jälkeen ja 3% pituuslimitys; topologia, UV ja tekstuurit säilyvät. X=toistosuunta,Y=ylös,Z=etu. C1-origo takareunan alakeskipisteessä, C3-origo pohjan keskellä muurin keskilinjalla. Ei rigejä tai animaatioita.

QA: ensimmäisessä reunakkain asetetussa versiossa oli näkyvä päätyrako; 3% limitys sulkee raon mukana olevassa kolmen palan CPU-toistokuvassa. Tämä EI vielä varmista välkkymättömyyttä pelissä: LR tarkistaa sivukamerat ja mahdollisen päällekkäisten pintojen z-fightingin. C1:n maalatut palkinpäät ja päätytiilirivi erottuvat, konsoli on pelibudjetin vuoksi matala ja yksinkertaistettu. VS:n erillinen kannatinkaista1068 on käytettävissä syvemmän siluetin täydentämiseen. Lähde- ja v1-tiedostot on säilytetty.

Friisien kuvio jatkuu toistossa, mutta pigmentti-/puunsävy ei ole pikselintarkasti identtinen sauman yli (reunaero keskimäärin9,3/255 ja16,2/255); VS tarkistaa sen pelin valaistuksessa. Ne eivät ole mitattuja fyysisiä albedo-materiaaleja. Normaalikarttaa ei ole näille tilattu eikä liitetty. Kourutiilen1066 erillinen base+normal-pari on vielä tekemättä.

Kutsut tähän 3D-erään:2×45=90 Tripo-krediittiä. Jobit8ef11744-bfcf-42c2-b7d1-b83db314f8f6 ja6370e8f5-32de-48e4-adc4-ec2e11d87971,saldo18380. Friiseille2 image_gen-kutsua,rahahinta ei näy,ei Tripo-kuluja. SHA256SUMS ja MANIFEST mukana; kuvat postin c1-c3-review-v2/ ja friisit-v2/ -kansioissa.

C1-kulman1056 täsmennys PK/LR: tarkoittaako tilauksen45° kulmapala rakennuksen90° ulkonurkan kahta45° jiiripuolikasta vai reitin/räystään45° suunnanmuutosta? Ehdotan90° rakennusnurkan puolikasta, jossa nurkkaräystäs nousee hieman. Jatkan sillä välin C2:n neljää marmoripalaa; niistä on nyt lähdekuvat. C5 pysyy suunnitelmana, ei uutta suurta rakennusmallia ennen KK/LR-arviota.

Vastaanotto, havainne-editorin pelivertailu, hyväksyntä ja peli-integraatio ovat vielä erillisiä. Tämä on sovituspaketti, ei lopullinen hyväksyntä.
