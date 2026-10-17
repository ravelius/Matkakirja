# Natiivi-UI: kamerapöydän "Maa pimenee" -löydös 17.10.2026 klo 06.3x

Ajot: lokit/todistus-kamerapoyta-ipad-198-20261017-0544 ja -iphone-…-0548 (käännös 93a97749f, haara natiivi-ui/kamerapoyta-198 1ff45e88e).

## Mitä tapahtui
- Skenaario otti K0-kuvan lentopöydällä kytkin pois ja etsin KIINNI → IssKameraKuva kulki vanhaa polkua (ei rivejä
  "kuvaa: etsin …", vaan "kamera: kohde … kenttä 30,0°", "laukaisu 20261017-024722"). Kuva valmistui vasta 58,9 s myöhemmin.
- K3:n laukaisu kamerapöydällä (etsin auki) tuli, kun K0-kuva oli vielä kesken → IssKameraKuva ohitti napautuksen
  (`kaynnissa`), lokissa vain YKSI laukaisu ja yksi VALMIS.
- K4/K5 osuivat vanhan polun "kuvan pinta päällä (z6–z9)" -vaiheeseen (kamera asettui → VALMIS): silloin ikkunassa Maa on musta.
  Etsimen polulla pysäytyskuva peittää tämän vaiheen (196:n etsinajo: "etsin pysäytyskuva … rajaukseen"), siksi siellä ei näkynyt.
- KEHITETÄÄN ~2,5–3 min on sama vanha polku (ei taantuma).

## Johtopäätös
- Kamerapöydän koodi (IssOhjaamo.Kamerapoyta.cs) ei koske piirtoon eikä IssEtsimeen kuvauksen aikana: ei vikaa kamerapöydässä.
- Skenaario sk-kamerapoyta-198.txt korjattu: K0-kuva odotetaan valmiiksi (oleta 240 "iss-kamera: oma kuva:"), K3:lle
  oletus "kuvaa: etsin" ja K4 vasta K3-kuvan valmistuttua. iPad-uusinta lisätty simu-jono-0620.zsh:n loppuun.

## Avoin (PT päättää, ei NUI:n koodia)
1. Kytkin päällä lentopöydän punainen laukaisin kuvaa etsin kiinni → vanha polku: Maa pimeänä kuvan pinnan ajan + pitkä kehitys.
   Vaihtoehto: laukaisin lentopöydällä avaa ensin etsimen (LAAJA) ja kuvaa sen polulla. Vanhan polun musta Maa kuvan pinnan
   aikana on Pelikoodarin/Linssisepän aluetta (kyydin pinta, IssKameraKuva).
2. SEURAA: linssissä ei kuuntelijaa (IssKamerapoyta.SeuraaMuuttui) — linssin seurantarajapinta PK/LS:ltä.
