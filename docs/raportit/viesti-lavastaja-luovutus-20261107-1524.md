# Lavastajan luovutus 7.11.2026 15.24 — riittää yksin (korvaa -1415)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/palkki. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstin takia (25 %).

## Tehtävä (PT 14.26, omistajan pyyntö, ennen junaa 220)
Seinän juuressa ei vaaleaa palkkia, joka alkaa ja loppuu ilman syytä; vihreä boordi ehjä koko matkalla. Palkista koko sarjaa koskeva poisto: kuva PT:lle ennen poistoa, PT vie KK:lle. Yksi iPad-ajo JU:lla, kun korjaus valmis; rivi PT:lle: lähde ja korjaus. PT:n lisäys: tarkista, onko kaistan lähde lod1:n lattia; näytä muitakin poistopaikkoja; kerro, kannattaako irtolaatta palauttaa.

## Tila
Boordi: tausta-v115:n V4_red-jäänne y 4-4,5. Poisto todistettu kuvat-e:ssä 6.11. ja raja-x:ssä 7.11. (Mac). 7 kolmiota: 0-1 lod0/1/2, 1-1 lod0.
Palkki: osasarja-v8 reunakivi, 393 polkua. 252:lla vapaa pää (> 2,5 m solmusta, oma raja). Pelkkä poisto (koejuuri-palkki) jätti kirkkaan pienkivikaistan; irtolaatan poisto paljasti saman kaistan.
Täyttökoe koejuuri-palkki2 (tee_palkki2.py): lod0-lattia kiven kohdalle, y +2 mm, ei leivontaa; 1858/5512 kärjen UV1 lähimmästä kärjestä, valovirheitä voi näkyä.

## Seuraava askel
JU ajaa aja-palkki2.zsh (61afeb7f2, pid 83804, 16+8+2 kuvaa), rivi "PALKKI2 AJETTU". Kansiot kuvat-palkki2, kuvat-lisa-perus, kuvat-palkki3; vertailu kuvat-palkki-perus.
1. Katso täysikoon rajauksin. Parit: palkki-perus | palkki2 samoista kameroista, lisa-perus | palkki2 (lisa0-7, paikat lisakohteet.json). pari.py ja rajaus.py pohjina.
2. Lod1-koe: palkki3 = palkki - 3-1:n lod1/2 V4_lattia; juuri-lahi ja pelia verrataan kuvat-palkki:n samoihin. Muuttuuko kaista?
3. Rivi PT:lle (<= 3 riviä): pari, lod1-tulos, irtolaatan arvio. KK:lle vasta PT:n kautta. Ei poistoa ennen PT:n sanaa.
4. PT:n sanan jälkeen: uudet versiokansiot (tausta, osasarja; ei vanhaan), yksi iPad-ajo JU:lla, rivi PT:lle: lähde ja korjaus.

## Avoin
vapaa2-kamera huono. Lisäkohteet vain 37 kelvollisesta paikasta, ei edusta kaikkia 252:ta. Raja-x:n kaukainen vaalea kappale ja vapaa0:n matala kivireunus jäävät, lähde mittaamatta. jaa0:n punainen pystyviiva on molemmissa. Lod1/2 täyttöä ei ole; kaukaa ei katsottu. Muurin varjo täytön kohdalla: vain kuvista.
Kulkukartan seinäkorjausta ei tarkistettu 03.5x:n jälkeen; PT:lle kerrottu.

## Edellisestä voimassa
0c3232522 kuitattu junaan (julkaisija/juna-220, 2410473bb). Lokihaarat lavastaja/seina4-loki ja seina5-instanssi eivät junaan. v127 ja v115pala eivät vientiin ilman PT:n sanaa. Natiivi worktree /Users/Shared/Claude/wt/proto-lavastaja-esto-kivisivu. Python numpyllä: /opt/homebrew/bin/python3.
