# Lavastajan luovutus 3.11.2026 klo 02.31 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen viesti-lavastaja-luovutus-20261102-2245.md on viite (rooli, tapa, työkalut). Syy: kontekstin pehmeä raja.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, lähikoristeet + omat mallit (Pariisi). Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/, paketit proto-3d/_valmiit/.
- Kulku: PT nimeää → tee → pari PT:lle → kuittaus → paketit → JU-vientipyyntö (local_06f8c680-4618-42bd-a730-9b6a3e17e0b7) + PK-kytkentärivi
  (local_91a1bc27-6870-46aa-9886-66fd33b68880). PT local_5df52e10-10e4-4b72-9554-0049db300dfe, ≤ 3 riviä. Viestit send_messagella id:llä.
- Testijuuri: wt/proto-lavastaja-esto-2f nyt detached 1657d1932 (PK: 景阳宫 kytketty). Peli-testit ovat dotnet-käännös (kaanna.sh), ei Unity.

## Tila 02.31
| asia | tila |
|---|---|
| 景阳宫 | VALMIS: JU vei rakennukset-v117 22.47, PK kytki 1657d1932 (v117/v112/v36), 797/797. |
| Notre-Dame | VALMIS (PT kirjasi 22.5x): tehty jo 31.10. v6k28/v6k29, runko 218 lukee v6k29 (NS). Ei tehtävää. |
| LEVY (PT) | 21 Gt omasta _tyo-kansiosta T7:n proto-arkistoon symlinkein (leivonta-216, sisatilat-1b…3c, -214); paikalliseksi jäi sisatilat-3d. |
| PRONSSIT | ESIVALMISTELU VALMIS (PT 02.3x): proto-3d/_tyo/linnanrakentaja/pronssit-esi/LUE.md. Codexin toimitus posti/palatsin-pronssit-20261102/ EI vielä (02.14). PT herättää. |

## Pronssit lyhyesti (yksityiskohdat LUE.md:ssä)
- 42 paikkaa (paikat.json, sijoitus.py): Taihedianin kuuterassi + 三台 (kilpikonnat, kurjet, 日晷, 嘉量, 18 鼎), leijonat 太和门 ja 乾清门 vanhojen
  tilalle (korvaa) + 养心门 ja 宁寿门, 10 vesiastiaa. Reittikaistoista ≥ 1,62 m, geometria tarkistettu.
- kielletty-rakennukset-v118-luonnos (paikkamerkit + törmäys ≥ 1,6 m) + palatsi-esto-v37-luonnos (+562 ruutua): Juoksu 151/151, 1785 solmua, umpikujia 0.
- Kun paketti tulee: vaihda.py <codex> v118-luonnos v118 (koeajettu: virheitä 0, vanhat leijonat 7 476–7 686 kolmiota pois) → pari PT:lle →
  esto v37 lopulliseksi + testaa.zsh → paketointi → JU + PK (rakennukset-v118 + esto v37) + vesiastioiden paikat PK:lle (vedenkantaja).

## SEURAAVAKSI
0. ETUSIJALLA (PT 02.5x, ennen pronsseja): taso 1, heti kujaportti-3:n takana reitin poikki punainen umpimassa (peittokartta "huippu 8.4 ala 0.5",
   maailma z −841…−843, x 126), keisari juoksee läpi, vika 26.10. lähtien. Selvitä massa (tausta-v112, muurikate-v37 vai osamalli?) ja korjaa reitti
   ohi tai aukko massaan, jos portti johtaa läpi. Lähtötiedot: proto-3d/_tyo/pelikoodari/tallenne-218t/taso1b5-havainnot.md + kooste-jpg:t.
   Huom: "maailma" = Unityn kehys (z peilattu, kierto) → pohja-kehykseen JuoksuPalatsi.Maailmaan-käänteisellä; kujaportti-3 paikka_pohja (−139,0; 444,5).
   Valmis → PK (local_91a1bc27-6870-46aa-9886-66fd33b68880) uuden tallenteen ajoon JU:n vuorolla + rivi PT:lle.
1. Pronssit, kun PT herättää. Jos jono muuten tyhjä: "JONO TYHJÄ: Lavastaja" PT:lle.
