# Lavastajan luovutus 5.11.2026 2135 — LUE TÄMÄ, sitten L/ARVIO-vyohyke-uudelleen.md

L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe. Loki: muuri/KORJAUS.md (21.12, 21.2x, 21.3x). Ei vientejä, ei ajoa käynnissä. Mac-ajot JU:n vuorolla (runko 980bb115c, aja24e.zsh + sk24e-koe.txt mallina).

## PT:n käsky (sitova, 21.3x)
Yksi rakennus lattia21:stä, ei paikkaa 24e:hen. Ennen ajoa:
1. Laajennettu tark löytää kaikki tunnetut: z 630 lattia23:sta, z 662:n taitos 24d:stä, z -514 24e:stä.
2. Laske muuttuvat pisteet ja jalat sekä mittaa mallista kulkuverkon ja sokkelien korkeusero; raportoi rivillä.
3. Selvitä hahmon uppoaminen z -512:ssa, ei arviota.
4. Taitosraja kalibroidaan olemassa olevista kuvista, jos pystyy.
Sitten yksi ajo, puhdas käynnistys, enintään 5 kuvaa, ei vientiä. Uusi näkyvä vika: ei korjausta, vaan tulos ja vaihtoehdot PT:lle. Viestit PT:lle ≤ 3 riviä.

## Tila
- 24e (L/tee24e.py, pohja 24d, pohjat 24d/24c/23 ketjussa): repeämä ja taitos poissa, länsi z -512:ssa katko (L/rajaukset24d/lansi-z-512-viiva-24e.png, askel 21: 0,112, 24b 0,367, 24e 0,349, L/viiva24e.txt). Sama luku jo 24b:ssä; lattia23:sta aluetta ei mitattu.
- Yhteinen syy (L/ARVIO-vyohyke-uudelleen.md): karkean 25 m:n pisteen siirto ulottuu 25 m, tarkat palat eivät seuraa. Tarkat palat ovat irrallaan karkean päällä.
- Uusi rakennus: y' = y * t, t = etäisyys saumasta / 25 m; kaikki lattiapisteet; myös päät z -525...-500 ja z 675-700; tarkat pois muutosalueelta, jos alla karkea; jalat seuraavat. Pohja koejuuri-lattia21 (x ±475, tausta y 0). Juurinimi esim. koejuuri-lattia25; älä ota nimeä koejuuri-lattia24 (arkistolinkki T7:lle). Lattia21:n valokuvat tee22/tee23:sta (valon rivit x 475) eivät ole lattia21:ssä: tarkista, tarvitaanko ne (KORJAUS 20.27, 20.33).
- 24e:n kulmakenttä L/tee24e.py: t = max((z-675)/25, |x-475|/25) toimi kuvassa (L/rajaukset24d/pari-24d-24e-ita-z662-yla.png).

## Työkalut
- L/tark24.py: alue x 470-505, z -505...705; lisätty nousu ja taitos 3 m (vain x ≥ 475,2). Tulokset tark24-rinne.txt (21, 24b, 24d), tark24-tulos-24e.txt. Laajennettava x 470-530, z -535...730 ja tarkan palan vapaa reuna; L/viiva24e.py näyttää vakioiden korvauksen.
- Muut: rypaat24.py, kulma24c.py (kolmiot alueelta), laatikko24e.py (mitä alueella on, kaikki paketit; solmumuunnokset vain lasketaan), aukot24.py, rajaa24d.py (parit; rajaukset24d/). Python /opt/homebrew/bin/python3 ilman -I.
- Kalibrointi: taitos 0,19 (24b/24e itä x 490 z 690) näyttää ehjältä, 0,663 (24d x 480 z 680) ei. Muut kuvat: kuvat23-koe, kuvat24b-koe, kuvat24d-koe, kuvat24e-koe; itä z -512 kuvassa kohta x 500 z -500 (0,302) ei näyttänyt katkoa, mutta taitosta ei mitattu kuvasta.
- Kuvaerot ajojen välillä 34-50 % myös muuttumattomilla alueilla: eivät kelpaa todisteeksi, syy selvittämättä.

## Hahmon uppoaminen (kohta 3, aloittamatta)
Kuvissa L/kuvat24e-koe/ita-z-512.png hahmo ei näy, lansi-z-512.png vain pää. Lattia siellä y noin 1,1-1,2 m. Koodi: JuoksuV4Maailma.cs:204 `valo sijoita X Z [suunta°] [lattia m]` (git -C /Users/Shared/Claude/wt/proto-linssiseppa2-k17 show 980bb115c:Assets/Matkakirja/Scripts/Juoksupeli/JuoksuV4Maailma.cs). Oma arvioni oli testin sijoitus; ei tarkistettu.

## Todisteketju ajolle
Puhdas käynnistys, yksi juuri ennen ensimmäistä `v4 7`:ää (JuoksupeliNakyma.Avaa: auki-tilassa Uudestaan, ei latausta). Tuloksessa unity.log: juuririvi, avataan, ainoa "ulkorengas 24 palaa", ensimmäinen kuva. Kuvat esim. itä z 662, länsi z 630, z 556, länsi z -512, itä z -512. Saumakuvat täysikokoisina ennen "en näe".

## Jonossa, ei aloitettu
KORJAUS.md: PK:n konsoli, räystään alapinta, marmoriterassi; muurien kiertosuunta + V4_gold-räystäs (KK: yksi yleinen korjaus generaattoriin); h-zhongyoumen, h-zhongzuomen; valkoinen viiva (13; -407); (-87,5; 302,5); S-rengas-itä harmaa levy; vaakalevyt x -420; puita ilman tyveä x 136 ja 300. ND odottaa juoksupelin pintojen ja räystäiden jälkeen (PT 20.11).
