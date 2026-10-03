// MatkakirjaAani.mm — natiivin Matkakirjan ääni-istunto (Pelikoodari, 23.9.2026).
//
// Unityn oletusistunto on AVAudioSessionCategoryAmbient (ProjectSettings:
// muteOtherAudioSources 0), jonka iPhonen äänettömyyskytkin mykistää. Isoisän
// luennat ovat pelin sisältöä kuten webin <audio> (Safari soittaa sen
// kytkimestä huolimatta), joten puhe asettaa istunnon Playback-luokkaan.
// MixWithOthers: pelaajan oma musiikki tai podcast ei katkea.
//
// Unity-puoli: Scripts/Peli/AaniIstunto.cs asettaa istunnon heti käynnistyksessä ja aina, kun sovellus palaa
// etualalle (löydös 49, build 11: iPadilla ei kuulunut mitään, koska Playback asetettiin vasta ensimmäisestä
// puheesta; ennen sitä tehosteet ja musiikki soivat Unityn Ambient-istunnossa, jonka äänetön tila mykistää).
// Puhe.cs ja Aanisoitin.cs kutsuvat samaa varmuuden vuoksi. MatkakirjaAani_Tila kertoo istunnon mittaukseen.

#import <AVFoundation/AVFoundation.h>
#import <UIKit/UIKit.h>

extern "C" void MatkakirjaAani_Toisto(void)
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    NSError* virhe = nil;
    // LUENNAN ALKUKATKO (omistaja 1.0.39, Natiivi-UI 29.9.): tätä kutsutaan myös jokaisesta Unityn äänen kokoonpanon
    // muutoksesta (AaniIstunto.cs), eli juuri reitin vaihtuessa (Bluetooth herää, kuulokkeet kytketään). Ehdoton
    // setCategory samaan luokkaan käynnistää reitin neuvottelun uudelleen ja katkaisee ulostulon hetkeksi, joten
    // luokka asetetaan vain, kun se on väärä (sama kuvio kuin MatkakirjaRadio.mm istuntoKuntoon). setActive on halpa.
    // YHTEINEN ISTUNTO RADION KANSSA (omistaja 29.9.2026: AirPodseilla iskulause ja luennan alku katosivat, "kaikki
    // lukijat aloittavat väärin"): radio (MatkakirjaRadio.mm) jättää tilaksi Default, ja puhe vaihtoi sen SpokenAudioksi
    // jokaisen puheen alussa, eli reitti neuvoteltiin uudelleen juuri ennen ensimmäistä tavua. Kumpi tahansa tila kelpaa.
    BOOL oikein = [istunto.category isEqualToString:AVAudioSessionCategoryPlayback]
        && ([istunto.mode isEqualToString:AVAudioSessionModeSpokenAudio] || [istunto.mode isEqualToString:AVAudioSessionModeDefault])
        && istunto.categoryOptions == AVAudioSessionCategoryOptionMixWithOthers;
    if (!oikein) NSLog(@"MATKAKIRJA puhe: istunto vaihdetaan (%@ / %@ / %lu → Playback / SpokenAudio / MixWithOthers)",
        istunto.category, istunto.mode, (unsigned long)istunto.categoryOptions);
    if (!oikein && ![istunto setCategory:AVAudioSessionCategoryPlayback
                                    mode:AVAudioSessionModeSpokenAudio
                                 options:AVAudioSessionCategoryOptionMixWithOthers
                                   error:&virhe])
    {
        NSLog(@"MATKAKIRJA puhe: setCategory epäonnistui: %@", virhe);
        return;
    }
    if (![istunto setActive:YES error:&virhe])
        NSLog(@"MATKAKIRJA puhe: setActive epäonnistui: %@", virhe);
}

// ISTUNTOVAHTI (kärki 30.9.2026; omistaja TF 1.0.64 kaiuttimella ja ÄÄNETTÖMÄSSÄ TILASSA: "isoisän luenta alkaa vieläkin
// kesken kappaleen", alusta puuttuu 1–2 virkettä, myös nostoissa). Juurisyy: Unity 6000.3:n FMOD
// (FMOD::OutputCoreAudio::reset, Unityn regressio 6000.0.73f1 alkaen) palauttaa istunnon Playbackista Ambientiin
// taustasiirtymässä ja äänen uudelleenkäynnistyksessä. Ambient noudattaa äänetöntä tilaa, joten kaikki peliääni mykistyy,
// kunnes joku asettaa Playbackin uudelleen — ennen sitä vain fokus-, tauko- ja kokoonpanotapahtumat (AaniIstunto.cs) ja
// sovelluksen ensimmäinen puhe. Vahti palauttaa Playbackin heti, kun luokka vaihtuu Ambientiin tai SoloAmbientiin
// (reitin vaihto, syy CategoryChange), keskeytys loppuu, mediapalvelut nollautuvat tai sovellus palaa etualalle (FMOD
// käynnistää äänensä uudelleen omassa keskeytyskäsittelijässään, joten tarkistus myös 0,3 ja 1,5 s myöhemmin).
// PlayAndRecord (Pulun äänikeskustelu, sanelu) ja Playback-tilat jätetään rauhaan: vain äänettömän tilan mykistämät
// luokat korjataan. Kutsut omassa sarjajonossaan (ei synkronisia äänipalvelinkutsuja pääsäikeessä, vrt. MatkakirjaRadio.mm).

static dispatch_queue_t VahtiJono(void)
{
    static dispatch_queue_t jono;
    static dispatch_once_t kerta;
    dispatch_once(&kerta, ^{ jono = dispatch_queue_create("app.matkakirja.aani-istunto", DISPATCH_QUEUE_SERIAL); });
    return jono;
}

static BOOL Mykistyva(AVAudioSession* istunto)
{
    return [istunto.category isEqualToString:AVAudioSessionCategoryAmbient]
        || [istunto.category isEqualToString:AVAudioSessionCategorySoloAmbient];
}

/// Palauttaa Playbackin, jos luokka on äänettömän tilan mykistämä (Ambient / SoloAmbient). Palauttaa YES, jos korjattiin.
static BOOL KorjaaMykistyva(NSString* syy)
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    if (!Mykistyva(istunto)) return NO;
    // Vastavaihtojen kehä (FMOD nollaa uudelleen korjauksen jälkeen) katkaistaan: enintään 8 korjausta 2 s:ssa.
    static CFAbsoluteTime ikkuna = 0;
    static int korjauksia = 0;
    CFAbsoluteTime nyt = CFAbsoluteTimeGetCurrent();
    if (nyt - ikkuna > 2.0) { ikkuna = nyt; korjauksia = 0; }
    if (++korjauksia > 8)
    {
        // Jälkitarkistus, kun ikkuna on ohi: Playback voittaa, kun vaihtelu on tasaantunut.
        if (korjauksia == 9)
        {
            NSLog(@"MATKAKIRJA ääni-istunto: vahti tauolla (yli 8 korjausta 2 s:ssa, %@), jälkitarkistus 2,5 s", syy);
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.5 * NSEC_PER_SEC)), VahtiJono(), ^{ KorjaaMykistyva(@"jälkitarkistus"); });
        }
        return NO;
    }
    NSString* ennen = istunto.category;
    NSError* virhe = nil;
    BOOL ok = [istunto setCategory:AVAudioSessionCategoryPlayback mode:AVAudioSessionModeSpokenAudio
                           options:AVAudioSessionCategoryOptionMixWithOthers error:&virhe]
        && [istunto setActive:YES error:&virhe];
    NSLog(@"MATKAKIRJA ääni-istunto: vahti (%@): %@ → Playback / SpokenAudio / MixWithOthers %@", syy, ennen,
        ok ? @"ok" : [NSString stringWithFormat:@"VIRHE %@", virhe]);
    return ok;
}

extern "C" void MatkakirjaAani_Vahti(void)
{
    static dispatch_once_t kerta;
    dispatch_once(&kerta, ^{
        NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
        [nc addObserverForName:AVAudioSessionRouteChangeNotification object:nil queue:nil usingBlock:^(NSNotification* n) {
            NSUInteger syy = [n.userInfo[AVAudioSessionRouteChangeReasonKey] unsignedIntegerValue];
            dispatch_async(VahtiJono(), ^{
                AVAudioSession* istunto = [AVAudioSession sharedInstance];
                NSMutableArray* ulos = [NSMutableArray array];
                for (AVAudioSessionPortDescription* p in istunto.currentRoute.outputs) [ulos addObject:p.portType];
                NSLog(@"MATKAKIRJA ääni-istunto: reitti vaihtui (syy %lu): %@ / %@ / %lu, ulos %@", (unsigned long)syy,
                    istunto.category, istunto.mode, (unsigned long)istunto.categoryOptions, [ulos componentsJoinedByString:@"+"]);
                // Korjaus 0,4 s:n päästä yhdistettynä: ei vaihdeta luokkaa kesken FMOD:n oman nollauksen (samasta
                // nollauksesta voi tulla useita ilmoituksia), ja vain, jos luokka on silloinkin mykistyvä.
                static BOOL ajastettu = NO;
                if (!Mykistyva(istunto) || ajastettu) return;
                ajastettu = YES;
                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.4 * NSEC_PER_SEC)), VahtiJono(), ^{
                    ajastettu = NO;
                    KorjaaMykistyva([NSString stringWithFormat:@"reitti %lu", (unsigned long)syy]);
                });
            });
        }];
        [nc addObserverForName:AVAudioSessionInterruptionNotification object:nil queue:nil usingBlock:^(NSNotification* n) {
            NSUInteger laji = [n.userInfo[AVAudioSessionInterruptionTypeKey] unsignedIntegerValue];
            NSLog(@"MATKAKIRJA ääni-istunto: keskeytys %@", laji == AVAudioSessionInterruptionTypeBegan ? @"alkoi" : @"loppui");
            if (laji == AVAudioSessionInterruptionTypeBegan) return;
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), VahtiJono(), ^{ KorjaaMykistyva(@"keskeytys loppui"); });
        }];
        [nc addObserverForName:AVAudioSessionMediaServicesWereResetNotification object:nil queue:nil usingBlock:^(NSNotification* n) {
            NSLog(@"MATKAKIRJA ääni-istunto: mediapalvelut nollautuivat");
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), VahtiJono(), ^{ KorjaaMykistyva(@"mediapalvelut"); });
        }];
        [nc addObserverForName:UIApplicationDidBecomeActiveNotification object:nil queue:nil usingBlock:^(NSNotification* n) {
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), VahtiJono(), ^{ KorjaaMykistyva(@"etualalle"); });
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.5 * NSEC_PER_SEC)), VahtiJono(), ^{ KorjaaMykistyva(@"etualalle 1,5 s"); });
        }];
        dispatch_async(VahtiJono(), ^{ KorjaaMykistyva(@"käynnistys"); });
    });
}

/// Kevyt tarkistus juuri ennen soittoa (Puhe.AloitaKlippi, Aanisoitin): vain luokan luku; korjaus vain, jos Ambient.
/// Synkroninen, jotta ensimmäinen tavu ei osu mykistettyyn istuntoon (korjaus on harvinainen: vahti ehtii yleensä ensin).
extern "C" bool MatkakirjaAani_Varmista(void)
{
    // Vahdin jonossa (laskurit ja vastavaihtojen raja yhdessä säikeessä); pääsäie odottaa vain, jos jono on kesken.
    __block BOOL korjattiin = NO;
    dispatch_sync(VahtiJono(), ^{ korjattiin = KorjaaMykistyva(@"ennen soittoa"); });
    return korjattiin;
}

// Bluetooth-reitti (omistaja 29.9.2026: luennan alku jäi kuulematta AirPodseilla): Puhe esilämmittää linkin lyhyellä
// hiljaisella viiveellä ennen uutta klippiä, kun jokin ulostulo on Bluetooth (A2DP, LE tai HFP).
// ULOSTULON VIIVE (Linssiseppä 2, 3.10.2026; omistaja TF 133: ajattelijan iskut "lähellä mutta eivät ihan osu"): aika, jonka
// ääninäyte kulkee Unityn miksauksesta korvaan laitteen puolella: outputLatency (reitti: kaiutin, kuulokkeet, Bluetooth ~0,15–0,25 s)
// + IOBufferDuration (Core Audion puskuri). Sekunteina; AjattelijatSovitin siirtää kohtauksen kelloa tämän verran (AaniIstunto.Viive).
extern "C" double MatkakirjaAani_Viive(void)
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    return istunto.outputLatency + istunto.IOBufferDuration;
}

extern "C" bool MatkakirjaAani_Bluetooth(void)
{
    for (AVAudioSessionPortDescription* p in [AVAudioSession sharedInstance].currentRoute.outputs)
        if ([p.portType isEqualToString:AVAudioSessionPortBluetoothA2DP] || [p.portType isEqualToString:AVAudioSessionPortBluetoothLE]
            || [p.portType isEqualToString:AVAudioSessionPortBluetoothHFP]) return true;
    return false;
}

// Istunnon tila mittaukseen (peli-komento "aani mittaa"): luokka, tila, valinnat, laitteen äänenvoimakkuus,
// muiden äänten vaimennusvihje ja reitti. Palauttaa malloc-merkkijonon (Unityn marshal vapauttaa sen).
extern "C" char* MatkakirjaAani_Tila(void)
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    NSMutableArray* ulos = [NSMutableArray array];
    for (AVAudioSessionPortDescription* p in istunto.currentRoute.outputs) [ulos addObject:p.portType];
    NSString* t = [NSString stringWithFormat:@"luokka %@, tila %@, valinnat %lu, voimakkuus %.2f, muut soivat %d, reitti %@, näytetaajuus %.0f, kanavia %ld",
        istunto.category, istunto.mode, (unsigned long)istunto.categoryOptions, istunto.outputVolume,
        istunto.secondaryAudioShouldBeSilencedHint, [ulos componentsJoinedByString:@"+"], istunto.sampleRate,
        (long)istunto.outputNumberOfChannels];
    const char* c = [t UTF8String];
    char* kopio = (char*)malloc(strlen(c) + 1);
    strcpy(kopio, c);
    return kopio;
}

// Mittauksen istunnon vaihto (peli-komento "aani istunto <luokka>", löydös 49): playback = Playback + Default,
// puhe = Playback + SpokenAudio (MatkakirjaAani_Toisto), ambient = Unityn oletus. Palauttaa tilan tai VIRHE-rivin.
extern "C" char* MatkakirjaAani_Vaihda(const char* luokka)
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    NSString* l = luokka ? [NSString stringWithUTF8String:luokka] : @"";
    NSError* virhe = nil;
    BOOL ok;
    if ([l isEqualToString:@"ambient"])
        ok = [istunto setCategory:AVAudioSessionCategoryAmbient mode:AVAudioSessionModeDefault options:0 error:&virhe];
    else if ([l isEqualToString:@"puhe"])
        ok = [istunto setCategory:AVAudioSessionCategoryPlayback mode:AVAudioSessionModeSpokenAudio
                          options:AVAudioSessionCategoryOptionMixWithOthers error:&virhe];
    else
        ok = [istunto setCategory:AVAudioSessionCategoryPlayback mode:AVAudioSessionModeDefault
                          options:AVAudioSessionCategoryOptionMixWithOthers error:&virhe];
    if (ok) ok = [istunto setActive:YES error:&virhe];
    NSString* t = ok ? [NSString stringWithFormat:@"%@ %@, näytetaajuus %.0f", istunto.category, istunto.mode, istunto.sampleRate]
                     : [NSString stringWithFormat:@"VIRHE %@", virhe];
    const char* c = [t UTF8String];
    char* kopio = (char*)malloc(strlen(c) + 1);
    strcpy(kopio, c);
    return kopio;
}
