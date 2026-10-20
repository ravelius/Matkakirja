# Päätoimittajan luovutus 11.10.2026 klo 12.5x (oma nollaus 63 %, omistaja HEREILLÄ)

Session local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. Edellinen: viesti-fable-luovutus-20261011-aamu3.md. Muisti: fable-tila-20261011-paiva.
Työjonot: scratchpad/tyojonot.md (Päivitetty-rivit 11.4x→; muokkaus vain tmp + os.replace -skriptillä, ks. aamu3-luovutus).
Kirjattavat: scratchpad/kirjattavat-20261006.md — rivit 1200–1219 docs-PR #4400:ssa (Julkaisijalla), rivit 1218 ja 1220–1226 EI vielä lokissa → seuraava docs-PR.
HUOM Raamattu 454/460,8 kt (testin raja) → ennen seuraavia lisäyksiä karsinta (historia lokiin).

## 0. OMISTAJAN LINJAT TÄNÄÄN (sitovia, Raamatussa #4400:n jälkeen)
- EI KYSYMYSKORTTEJA: kysymykset ja palautteet tavallisena tekstinä vuoron viimeiseksi (omistaja 11.2x: "vaikea lukea").
- Asemataulun Sinulle-osio: vain tärkeimmät linkit viivoin (4 kpl), pienennettävä; Raati/Testaajat pelkkä luku.
- Generoidut äänet: ei kuuntelua eikä omistajan hyväksyntää, kunhan kieli fi (12.3x).
- Musiikkipromptit lyhyiksi ja myönteisiksi, ei kieltoja ("ei säröä") (12.5x).
- JUNA 182 lähtee VASTA OMISTAJAN SANASTA ja KAIKKI AVOIMET mukaan, myös Olavinlinna (12.5x). Tavoite: 1. beta-testaukset tänään.
- CLAUDE-SOVELLUKSEN UUDELLEENKÄYNNISTYS (ohjelmistopäivitys) JUNAN 182 JÄLKEEN: kun TF 182 Applella → roolit pushaavat (scratchpad viesti: /private/tmp/.../uudelleenkaynnistys-viesti.txt, kopio alla) → omistajalle "nyt sopii" → jälkeen CronCreate JONOKIERROS, Asemataulu watch, jatka-viestit rooleille, Julkaisija olavinlinna-vahti, Postivahti cronit.

## 1. JUNA 182 (Natiiviseppä kokoaa, ei lukitusta ennen omistajaa)
KUITATTU: LS1 af7314a19 (obeliski) + 8b6ac5542 (alkulento Ateena/Pariisi/Tukholma + horisontti), LS2 7a6051553 (museo v3 + NUI 79fbb7a35), NUI 3b2d97f6d (lähtökohteet), Pelikoodari 61c412e0d (pulla-turvaverkko, Tukholma ei lukitu) + 235b230ba (ISS NASA-radio venäjäksi), KS #4380 1049ce1de (data, merge Julkaisijalla).
EI MUKAAN: NUI 25f332fe1 (omistaja perui linnan tekstikorjaukset 12.3x).
AVOIMET (kaikki junaan):
1) LS1 aloitusintro 2b83b9365 → käännös + simu → arkki PT:lle → kuittaus. Päätökset annettu: 18 s kaikkialla (myös Pariisin muut käynnit), Tukholman nopea häivytys pohjolan raitaan, Pariisin alkulennolla luenta Pulun jälkeen; omistaja hyväksyi Ateenan ja Tukholman nopeat introt.
2) NUI Pulu-jakso (Kääk/Pöllö kadonnut → luenta + 2 tekstiä ajoituksin → Pöllö sähkötti/napauta minua; vain 1. kerta + Uusi matka) + KESKIAIKAISET KYLTIT Olavinlinnassa luettavaan kirjasimeen (koko/paikka ennallaan) → arkit → kuittaus.
3) LS2 museo: KOKO KEHYS näkyviin (~92–95 %) + ZOOM-nappi (OHJAUSNAPPI-pohja, ~2,5×, veto, kierros pysähtyy) → arkki → kuittaus.
(OMISTAJA 12.5x: HIOMINEN MYÖS JUNAAN 182, laatu tärkein; paremmat työtavat käyttöön.) 4) OLAVINLINNA: Siirtoseppä b442076c1 + v47h/v47i/v47k → BOTTI 3/17 (12.22), korjaa aloitukset + kynnys → BOTTI x/17 → 8. kierros KAHDELLA SIMULLA rinnakkain (Laitetestaaja; Julkaisija antaa simut) → PT katsoo → läpi = junaan. Myös hiominen (omistaja 12.5x); rinnakkaiset agentit + botti + 2 simua.
5) SK aloituskaupunkien KORJAA-korjaukset (data-PR → sisältöpaketti; iskulause "Missä keskustelu keksittiin" säilyy).

## 2. NOLLAUKSET KESKEN (NOLLAUSRAJA 50 %)
Julkaisija NOLLATTU 12.4x + aloitusviesti + RC päällä. PYYDETTY luovutus ("VALMIS NOLLAUKSEEN: <rooli>" tulee PT:lle): Linnanrakentaja 76 % (heti), Natiiviseppä 66 % (pallohehkukokeen jälkeen, ennen lukitusta), Laitetestaaja 56 % (heti), Pelikoodari 64 % (musiikkierän jälkeen), NUI 56 % (182-erien jälkeen), Sisältökirjuri 58 % (korjaus-PR:n jälkeen).
Kaava: RC pois → SendMessage "lataa clear_session ja kutsu self" + notify_when_idle → list_events tyhjä → send_message aloitusviesti (luovutuksen polku + Raamattu kohta 2 + PT:n lisäykset) → RC päälle.
Postivahti ei käytä varakanavaa (SendMessage-tauko); kontekstiluvut näkyvät sen kierroksessa ja Asemataulussa.

## 3. MUUT AVOIMET
- Pelikoodari: jazz-piano + Rhodes taustamusiikit (museo + Ateena/Pariisi/Tukholma, 8 kpl) → äänisivulle → "MUSIIKIT KUUNNELTAVISSA" → kerro omistajalle (linkki https://matkakirja-aanet.pages.dev/). Sitten kipin 20 kpl soittolista (tyylit Viulu ja harppu + Harppu ja moderni tausta). Valitsemattomat musiikit arkistoon. Kuratoitu Pulu #4401 (ajankohtaisaiheet → pelin paikat). Savuke-pollon 13 vanhaa koetta jonossa.
- PR:t Julkaisijalla: #4400 (docs), #4401, #4388, #4398 (SK docs, ilman CI:tä → käsin).
- LS2 Pariisi v2: Bourbon pois (Google jää), Banque/Branly LR:lle linnan jälkeen; ei junaan 182.
- Natiiviseppä: pallohehkut muurien läpi (linna), MSAA D/E myöhemmin (vain kehitysversion konsoli).
- API-avain vaihdettu ja käytössä (live-Pulu vastaa); ANTHROPIC_ADMIN_KEY vanhassa organisaatiossa (ei kiire).
- Apurahakortti #4397 MERGED (maapallo + kuumailmapallo).
- Levy 80 Gi (siirra-ika 4 h 12.40). Viikko nollattu 12.3x (0 %).

## 4. UUDELLEENKÄYNNISTYSVIESTI ROOLEILLE (junan 182 jälkeen)
UUDELLEENKÄYNNISTYS NYT (omistaja päivittää Claude-sovelluksen): 1) commitoi ja pushaa keskeneräinen työ omaan haaraasi; 2) älä aloita uusia pitkiä ajoja; anna käynnissä olevan valmistua; 3) lähetä PT:lle "VALMIS UUDELLEENKÄYNNISTYKSEEN: <rooli> – jatkokohta: <…>". Jatka-viestin jälkeen käynnistä omat vahdit/cronit uudelleen.
