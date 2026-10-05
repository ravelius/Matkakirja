# Animaatiopaketit linnan hahmoille (verkkotutkimus 5.10.2026)

Merkinnät: LÄHDE = mitä sivu sanoo; PÄÄTELMÄ = oma johtopäätös. Hinnat Asset Storen EUR (ilman ALV, "taxes at checkout") tai julkaisijan USD.

## Yhteenveto kattavuudesta (puuttuvat liikkeet)

| Liike | MC Village Life | MC Seated | MC Dungeon Life | Kevin Iglesias Basic Motions | Cocomotion Board Games | RamsterZ Small Boat |
|---|---|---|---|---|---|---|
| Lakaisu (luuta) | KYLLÄ am_HoldBroom_Idle_02/03/05_Sweep, _04_WipeBrow | - | - | - | - | - |
| Padan hämmennys | KYLLÄ am_CookPot_Spoon_Stir_01/02, _Taste, _AddHerbs, _Smell | (am_SitChairTable_Idle_20_EatSpoon_Stir = syönti, ei kokkaus) | - | - | - | - |
| Soutu istuen | EI | - | - | - | - | KYLLÄ 8 paddle + 8 idle + enter/exit (airo vs. mela: ei varmistettu) |
| Säkin kanto | KYLLÄ am_CarryShoulderR_* (olka, Idle/Walk/Start/Stop/Turn/Talk), am_CarryOnBack_*, am_CarryInArms_* (sylissä), am_CarryBasket_*, am_CarryRHand_* (ämpäri) | - | - | - | - | - |
| Kirjoitus pöydän ääressä | vain yleinen am_BusyTable_01-03_UseHands | KYLLÄ am_SitChairTable_Idle_13_WriteLetter_Start/_01/_02/_03_LookAround/_04_Secret/_Stop, _14_LookAtPapers (istuen; nykyaikainen tuoli/pöytä) | - | - | - | - |
| Rukous/siunaus | KYLLÄ am_StandPray_Idle_01-05 (_Talk, _OpenHands, _LeanOver) | - | KYLLÄ am_Worship_Idle_01-05, am_WorshipDown_* (alttari) | - | - | - |
| Istuva noppapeli | EI | EI | EI | EI | KYLLÄ (osin) AS_Actions_TCG_RollDice_Single/_Multiple + AS_Idle_Sit_Chatting jne. (lähde: foorumisivu; rig ja Unity-versio varmistamatta) | - |
| Vartijan seisonta | - | - | KYLLÄ am_StandSpear_Idle_Guard_01-09 (LookAround, EntryDenied/Allowed, Talk, Sleep), am_Stand_Idle_Guard_01-16, am_GuardAtten_* | - | - | - |
| Kumarrus | EI | EI | EI | KYLLÄ (käsianimoitu) HumanM@Reverence01 + _Loop | - | - |
| Idle/puhevaihtelut | KYLLÄ (Talk/TalkYes/TalkNo joka kantotilassa, LookAround, StandStoop, StandBig, WalkA/B) | KYLLÄ (~250, istuen) | osin | KYLLÄ Idle01/02, Talk01-03, Question, HeadNod/Shake, Sit* | KYLLÄ (istuen) | - |

## Ehdokkaat

### 1. MC Village Life (MoCap Central) - KÄRKI
- Hinta: Asset Store EUR 73,59 (julkaisijan kauppa USD 79,99). Alennusta ei näkynyt sivulla (ks. Ale-huomio).
- Linkit: https://assetstore.unity.com/packages/3d/animations/mc-village-life-believable-3d-animations-by-mocap-central-349458 ; https://mocapcentral.com/products/animation-pack-village-life ; täysi lista https://mocapcentral.com/pages/village-life-animation-list
- LÄHDE sanoo: 314 animaatiota, oikeaa studiomocappia (kuvaus "professional-grade motion capture"), Unity Mecanim Humanoid, Unity 2022.3 LTS - Unity 6+, URP + Built-in, root motion, FBX-lähdetiedostot (Blender/Maya) mukana, UE5-mannekiiniluuranko (UE-nimet). Versio 1.0.2, 28.8.2026, 52,1 MB, Standard Asset Store EULA, Single Entity. Arvostelu mainitsee erikseen "scythe and the sacks".
- Kattaa: lakaisu, hämmennys, säkin kanto (olalla/selässä/sylissä), rukous, laaja idle/puhe. Ei kata: soutu, noppapeli, kumarrus, vartija, kunnollinen kirjoitus.
- PÄÄTELMÄ: UE5-mannekiinin FBX-lähdetiedostot (jos mukana Unity-paketissa; MC-kaupan sivu listaa ne, Asset Store -sivu ei varmista) sopivat suoraan Quaterniuksen UE-nimiseen rigiin Blender-kohdistuksessa. Täsmäpohja: kaikki MC-paketit jakavat saman siirtymäpose-standardin.

### 2. MC Seated (MoCap Central)
- Hinta: EUR 68,99 (julkaisija USD 74,99). Linkki: https://assetstore.unity.com/packages/3d/animations/mc-seated-believable-3d-animations-by-mocap-central-289895 ; lista https://mocapcentral.com/pages/seated-animation-list
- LÄHDE: 250+ mocap-animaatiota, Humanoid, mukana WriteLetter-sarja, SitChairTable-sarja (~60), SitFloor, SitSeiza; v1.1.1, 43,3 MB, Asset Store -sivun mukaan toimii vain URP:ssä (Unity 2022.3.62).
- Kattaa: kirjoitus istuen, istuvat idle/puhe. Ei kata: muita kuin kirjoitus. Moderni (toimisto, puhelin) -sisältö; kirjoitus ja pöytä kelpaavat, tuoliprop vaihdetaan.
- PÄÄTELMÄ: vain jos kirjoitus on tärkeä; muuten Village Life + Kevinin Basic Motions (Sit*, Talk) riittää.

### 3. MC Dungeon Life (MoCap Central) - vain vartija
- Hinta: EUR 124,20 (julkaisija USD 134,99). Linkki: https://assetstore.unity.com/packages/3d/animations/mc-dungeon-life-believable-3d-animations-by-mocap-central-287324 ; lista https://mocapcentral.com/pages/dungeon-life-pack-animation-list
- LÄHDE: 825 animaatiota, Humanoid, v1.4.0 (13.7.2026). Sisältää keihäsvartijan (am_StandSpear_Idle_Guard_*, sis. EntryDenied/Allowed ja nukahdus), am_Stand_Idle_Guard_*, Worship-alttari, SitFloor; suurin osa sisällöstä on taistelua/örkkejä/undeadia.
- PÄÄTELMÄ: kallis vain vartijan seisontaan; maksaa ~1,7x Village Lifen. Harkitse vain jos vartijat ovat tärkeitä.

### Halvat täydentäjät (ei mocap-pääpaketteja)
- Human Basic Motions (Kevin Iglesias), EUR 16,56: https://assetstore.unity.com/packages/3d/animations/human-basic-motions-157744 . LÄHDE (julkaisijan PDF-dokumentti https://www.keviniglesias.com/documentation/Human%20Basic%20Motions.pdf): 404 tiedostoa, HumanM@Reverence01 (+Loop), Talk01-03, Question01-02, HeadNod/Shake, SitGround/Low/Medium/High, Idle01/02, Cry, Beg, Drink, Eat; Humanoid; 2.5.1, Unity 6000.0.59+. Käsiavainnettu (ei mocap-väitettä sivulla). Kumarrus + puhe + istuminen.
- Playing Board Games and Cards (Cocomotion Studio), EUR 36,79: https://assetstore.unity.com/packages/3d/animations/playing-board-games-and-cards-animation-pack-391324 . LÄHDE (https://forums.unrealengine.com/t/cocomotion-studio-playing-board-games-and-cards-animation-pack/2733909 ja Fab-haku): 214 mocap-animaatiota, sis. RollDice_Single/Multiple, istuvat idlet, "Epic Skeleton". Unity 6000.3.2f1+. EI VARMISTETTU: onko Unity-paketin rig Humanoid ja onko noppa istuvaa pöytäpeliä; tarkista Asset Storen kuvauksesta/videosta ennen ostoa. Kaksi sotilasta -pari: ei, yksinäisiä animaatioita.
- Small Row Boat Anim Set (RamsterZ), USD 6,99, EI Asset Storessa: https://www.ramsterzanimations.com/store-buy/p/small-boat-anim-set-fbx-only . LÄHDE: 26 käsintehtyä FBX:ää (8 paddle, 6 enter, 4 exit, 8 idle), Unity Humanoid -konfiguraatio, root motion, vain FBX. Lisenssi (EULA) tarkistettava erikseen; "paddle" voi olla melonta eikä airo-soutu. Julkaisijan oma kauppa, ei Standard Asset Store EULA.

## Hylätyt / ei suositella
- Kevin Iglesias Human Crafting (ent. Villager) EUR 23: 322 tiedostoa luettu läpi, EI lakaisua, kokkausta, soutua, kirjoitusta, rukousta, istumista; sisältää vasaroinnin, kalastuksen, kaivauksen, Carry01 ja ObjectGripShoulder (olka-asento) mutta ei säkkikävelyä erikseen. Lähde: https://www.keviniglesias.com/documentation/Human%20Crafting%20Animations.pdf
- Kevin Iglesias Soldier: nykyaikainen (kiväärit), ei sopiva.
- Medieval Animations Mega Pack (Mister Necturus), EUR 138,01: v2.1.2 vuodelta 2018, alun perin Unity 4.5.5; sisällön yksityiskohtia ei saatu sivulta; vanha, ei suositella. https://assetstore.unity.com/packages/3d/animations/medieval-animations-mega-pack-12141
- Tavern/Inn & Tavern NPC (Cocomotion EUR 45,99 / Mighty Cat EUR 17,47): tavernakategoriat (innkeeper, patron, merchant, beggar); lakaisu/kokkaus/kirjoitus ei listattu hakutuloksissa; "Epic Skeleton". Ei kärkeen, ei varmennettu.
- RPG Character Mecanim Animation Pack: hakutuloksen mukaan sisältää kumarruksia, mutta ei tarkistettu.

## Ale-huomio
- LÄHDE (https://assetstore.unity.com/publisher-sale, hakutulos): Autumn Sale "50 % top sellers, 85 % new daily drops"; sivun päivämäärä oli "8.10.2025 7:59 PT" (todennäköisesti vanhentunut tai typo; vuosi oikein 2026?). Yhdenkään tarkistetun paketin sivulla ei näkynyt yliviivattua hintaa; hakija ei ole kirjautunut eikä nähnyt henkilökohtaista hintaa. Mocap Central ei ollut Publisher of the Week -tekstissä. PÄÄTELMÄ: oletetaan listahinta, tarkista kassalla (ale voi osua uusiin "daily drop" -paketteihin; MC Village Life julkaistu 8/2026).

## Suositus
MC Village Life (EUR 73,59) kattaa lakaisun, padan hämmennyksen, säkin kannon, rukouksen ja idle/puhevaihtelut; lisäksi Human Basic Motions (EUR 16,56) kumarrukseen ja istuvaan puheeseen; kirjoitus, noppapeli, soutu ja vartija jäävät erillishankinnoiksi (MC Seated / Cocomotion Cards / RamsterZ Boat / MC Dungeon Life).
