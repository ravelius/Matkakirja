# Codex → Pelikoodari, Lavastaja, PT: katot, friisit ja punainen rappaus

Tilaus 2258b56d ja tarkat UV-mitat 7eb80206 tehty tekniseen pelivertailuun. Neljä muunnelmaa/kategoria, yhteensä 88 PNG-materiaalikarttaa: katot, friisit ja kultalista, rappaus ja 0,5 m alalikajuova. Albedo + OpenGL +Y normal + roughness; height vapaaehtoinen, kultaan metallic, likaan maski. 12 havainnevertailuarkkia ja neljä friisin saumakuvaa.

T7: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kujakivet-11911194-20261027/palatsipinnat-v1`. Sama paketti postissa `posti/juoksupeli-palatsipinnat-20261027/palatsipinnat-v1/`. SHA256SUMS, MANIFEST ja qa/readback.json mukana. Kaikki 88 PNG:tä luettu takaisin, koot ja normalien yksikköpituudet tarkistettu. Ei Tripo-malleja tai muutoksia pelin koodiin.

Katto 512² / 1 m, neljä kaarevaa tiiliriviä ja 25 cm limitys. Friisi 2048×512 / 4,13×1,03 m; lista 512×32 /1×0,06m. Rappaus 2048² /4m, alalika2048×256 /4×0,5m sokkelin yläpuolella. Väriavaruudet, normalin suunta, toistot ja tarkka alalikan UV-vaihe KAYTTO.md:ssä.

Rajat rehellisesti: normal ei muuta katon siluettia. Rappauksen native1254px on viety2048px:iin; ei natiivi2K-lupaus. Friisin native3:1 on normalisoitu4:1-kuvaan, ja reunoissa voi olla kultaviivan noin pikselin porrastus (reunojen keskiero1,15–2,15/255). Tämä kuuluu pelin lähikameran parikuvatarkastukseen. Lähikuvan toiston huomaamattomuutta ei ole hyväksytty ilman peliä.

Kutsut tässä paketissa15ImageGen:4katto+7friisi+4rappaus; niistä kolme hylättyä friisiä säilytetty. Koko pintatilauksessa kivet mukaan lukien19. Tripo0 /0krediittiä. Kuvatyökalun rahakustannus ei ollut saatavilla.

LR: sovita nykyiseen geometriaan ja ota pari tavoitehavainteen kanssa samalla kameralla ja valolla. KK/omistajan hyväksyntä on avoin. Kivipinnat toimitettu erikseen c56b5c011134f5ab50c2e8a44bfb75fd83af8c32.

Natiivisepälle: luin aarteen teknisen vastaanoton ee4e944f3f0a8299335559e4d8b0487cccf62079 kokonaan ja kirjasin kaikki viisi havaintoa. J3/J4 teknisesti vastaanotettu; en tee korjauksia ennen ilmoittamaasi pelin valon, käsi-/arkkusovituksen ja J4-kahvan kuvaparia. Alkuperäiset ja toimitus pysyvät muuttumattomina.
