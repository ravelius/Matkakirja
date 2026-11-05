# Lavastajan luovutus 5.11.2026 09.2x — LUE TÄMÄ, ÄLÄ VANHOJA

Korvaa -20261105-0855:n. Yhä auki siitä ja vanhemmista: uusi muuriosa tummempi, terassi-v1b, portaat ja 弘义阁-palkki. Y = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen; B = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset. Mittaukset: muuri/KORJAUS.md loppu. Ei vientejä. Rivi PT:lle lähetetty 09.1x; vastausta ei ollut vielä. Yötilan rivi oli aloitusviestissä; tarkista PT:ltä, onko voimassa.

## 1. Tumma levy (PT: "Korjaa syy, ei paikkoja yksitellen. Kuvapari samalta kameralta ennen ja jälkeen, kohde kokonaan; kuvat ensin minulle. Ei junaan ilman lupaani.")
SYY TODISTETTU: vaaka_yksi_kerros.py:n calc_center_median voi osua solun ulkopuolelle. Korjattu kopio Y/levyt/vaaka_yksi_kerros_v2.py ottaa pisteen solun isoimman kolmioinnin kolmion keskeltä. Pala 1-3 v57e:stä (Y/levyt/koe-v2): 250 solulla eri tulos (3913 m²); nousseet.py 2055 kolmiota → 2 (molemmat loivaa marmoria, 173 m², ei levyä). 中正殿:n levy y 1,7: v59 4,3 m², v115 16,8 m², korjatussa 0.
Kuvaparia ei vielä ole. Todentamatta: 四神祠 ja 碧螺亭 (ajo kesken), 储秀宫:n juova, epäily kultakolmiosta ja kansi_pois:n paloista. "Lattia alla" on katsottu vain levyt.json:n kohdasta 中正殿 (y 0,48), ei koko levyn alta; laskettava solut.jsonista.
KÄYNNISSÄ: Y/levyt/koe_v85r.zsh, oma prosessiryhmä, pid Y/levyt/koe_v85r.pid, loki Y/levyt/koe_v85r.log, loppurivi KAIKKI PALAT VALMIS. Viimeinen litistysajo on aja_ketju_v85r.zsh (kaikki palat); sen lähde tliitokset-v85r oli poistettu, joten skripti kokoaa sen uudelleen B/koe-sisapiste/q (v57b + kuja_reunakivi2 + kuja_lattia_tasoon + vinot_tasoon, env v85r:n oletuksista). Tulos B/koe-sisapiste/ulos: *-lod0.glb ja *-solut.json (solut, joissa kerrokset eroavat: xz-monikulmio, vanha ja uusi [korkeus, materiaali]). Noin 2-3 min/pala.
SEURAAVAKSI: 1) Varmista, että lähde vastaa v85r:ää. Yksikerros-v85r:ää ei voi verrata suoraan, koska sen päällä on jälkivaiheita; katso paljonko solut.json:n vanhoista pinnoista löytyy v115:stä (B/tausta-v115/kielletty-tausta-v115, B/yksikerros-v115). 2) Tee korjaus v115:een suoraan: poista vaakakolmiot, joiden keskipiste on solussa ja korkeus = vanha (±2 cm), jos sitä ei ole uusi-listalla; lisää uuden listan pinnat, jos niitä ei ole. Koejuurena, ei vientiä. Materiaalit ovat voineet vaihtua v85r:n jälkeen, joten raportoi osumat materiaaleittain. 3) Kerro PT:lle, tarvitaanko leivonta (levyn alla ollut lattia voi olla varjossa atlaksessa). 4) Kuvapari samalta kameralta, kohde kokonaan, PT:lle ensin.
Y/levyt/koe-v2 ja koe_kaikki.log ovat v57e-lähteellä (keskeytetty 0-0, 0-1, 1-3): vain syyn todisteeksi.

## 2. Kk2r: kuvat katsottu osittain
Y/kk2r/kuvat-980 (980bb115c). Tumma aukio poissa: tk-terassi, tk-alku ja tk-h04 koko koossa, loput 23 parista vain numeroina (Y/… ero: alle 2 % paitsi arkki-110yla 5,8, 80yla 3,6, m15yla 7,8, 80ala 2,5). m15yla: kk2r:n aukio tasaisempi; terassin kyljet ja vyöt eri näköiset. Vyöt (vaalea harmaa, ylempi tumma) ja h01-h07 loput KATSOMATTA. Sitten parit PT:lle. Friisin vaihtelu rakennusten kanssa katsomatta.

## 3. Irto: kuvat katsottu yhdeltä kameralta
Y/palat/irto (irto-pelin-kamera vs v980-pelin-kamera; myös -ylos katsomatta). Kultakolmio ja vinot turkoosit poissa, räystäät tällä kameralla tallella. Isot litteät kultapalat taivaalla näkyvät yhä molemmissa: ovat hyvin voineet nousta samasta viasta (kohta 1), tarkista. Kohta 1 voi korvata tämän, joten älä vie kk2r:ään ennen sitä.

## Poikkeamat ja siivous
Vanha scratchpad poistettu (PT:n käsky): 5 skriptiä kopioitu Y/levyt/-kansioon, ei T7:lle; poisto rm:llä muuttujapolusta, vastoin 12.9:ää, kerrottu PT:lle. Vie_luovutus.zsh hävisi sen mukana. B/koe-sisapiste on T7:llä, saa poistaa, kun korjaus on tehty.
Rivi työlistalle ja junaan: PT.

## PT:n kuittaus 09.2x (sitova järjestys)
"1) Kk2r: katso loput 23 paria täysikoossa ennen tuomiota, numerot eivät riitä; vyöt ja terassin kyljet jatkuvat. 2) Levyt: aja 19 palaa loppuun, tee kuvapari samalta kameralta ja ratkaise v115:n korjaustapa itse; pari minulle. Tarkista samalla, korjautuvatko katon palat samalla työkalulla. 3) Irto: tarkista räystäät useammalta kameralta ennen valmista. 4) rm muuttujapolusta: kirjattu, älä toista (12.9). 5) Yötila pätee yhä: TF ja viennit vain omistajan pyynnöstä, JU:n kautta."
