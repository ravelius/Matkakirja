# Notre-Damen edusta19d — lähteet ja menetelmä

## Toimeksianto
Omistajan4.11.2026 klo14.48 pyyntö, Karttasepän tilaus #2032.
Posti: posti/karttaseppa-codex-notre-dame-19d-edusta-20261104.md
Commit1f283a06ed9cc3fc5ab5e9aeb614238ce13f1327; blobe057ead27516660232b409078714dc339d11f542.
TILAUS-19d-edusta.md luettu kokonaan, SHA256 b3917a6119722b43bc732ae94dd5760f19459af25416bab6933202235da93269.

## Syötteet — kaikki luettu ja katsottu
- /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-3d-20261104/_input-19d/kirkon-jalanjalki.png
  SHA256 fa4ac2312356833a2be2b5c7188b501b990ce3c68aa2da8a38d61cf81b54659f; 1536×1024 RGB.
- /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-3d-20261104/_input-19d/pelikuva-viisto-s-000.png
  SHA256 0f3258fac736fda6f3828cca4d7e0caf06f3d74a50ee43f1418c9616b34634ab; 2752×2064 RGB.
- /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-3d-20261104/_input-19d/pelikuva-ylhaalta.png
  SHA256 f88c28d488e82bdf4dffce8ee284b5e769383b8195ac34985a654ee2f44fe777; 2752×2064 RGB.
- /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-3d-20261104/_input-19d/pohja-valmis.png
  SHA256 4ec1a28909cd2c4a86203bd90548098b0632e4dafb770463eb820322856ce1d4; 1536×1024 RGB.

Pohja-valmis.png ja kirkon-jalanjalki.png annettiin generaattorille. Pelikuvat katsottiin vain sijoitusongelman ymmärtämiseksi; niitä ei annettu generointiviitteiksi, eikä striimikartan alueita kopioitu.

## Menetelmä
Codexin sisäänrakennettu ImageGen. Tasan yksi kokonainen uusi generointikutsu. Ei lisäottoa. Uusi koko kuva1536×1024, RGB PNG ilman alfaa. Ei osittaista jälkieditointia, kopioituja alkuperäisalueita, värimuunnosta, rajausta tai skaalausta. Kuva on tavuntarkka natiivi tulos.
edusta.png SHA256: 9ae4c10b7632bf1229478a558387fb63724a7a4c2729371a8d4b781211927d41
Natiivi generaattoritiedosto: /Volumes/T7 4TB/ChatGPT-Codex-active/Codex-app-data/migration-20261011/codex-home/generated_images/01a06e21-9b03-73e1-8856-44c9ffffb635/exec-84dca27d-cda2-4e18-a4be-6071be4b537c.png
Tallennettu alkuperäinen: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-19d-edusta-2032-20261104/originals/edusta-v1.png
Prompti: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-19d-edusta-2032-20261104/prompts/edusta-v1.txt

## Geometria ja QA
Kirkko on erillinen pelimalli; sitä ei piirretty eikä siirretty. Kiinteä keskipiste834,684, akseli112°, kulmat751,521 /1007,624 /917,847 /661,744, julkisivu706,632.
Avoin kivetty aukio länteen ja kapea reunakiveys. Tuloksen aukio kasvoi suunniteltua suuremmaksi. Muuttuneet talot sekä k55-värien ja muiden alueiden säilymispoikkeamat on kuvattu huomiot.md:ssä.
Tekninen koko/muoto/nativebyte-tarkistus PASS. Täsmällisen pikselisäilytyksen ja täsmälleen samojen värien tarkistus FAIL. Kuvaa ei ilmoiteta täysin lähdeohjeen täyttäväksi.
QA tehtiin Pillowlla natiiveista samankokoisista kuvista ilman rekisteröintiä tai resamplausta. Diagnostiset rajaukset, erotuskuvat ja merkinnät ovat vainqa-kansiossa; tuotantokuvaa ei muutettu.

## Toimitus ja arkisto
/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-19d-edusta-2032-20261104
Shared-polku: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-3d-20261104/_review-edusta-19d/ (symbolinen linkki T7:n delivery-kansioon).
SHA256SUMS kattaa edusta.png-, LAHTEET.md- ja huomiot.md-tiedostot. Vastaanotto, hyväksyntä, pelisovitus ja julkaisu ovat erillisiä eikä niitä ole varmennettu.
