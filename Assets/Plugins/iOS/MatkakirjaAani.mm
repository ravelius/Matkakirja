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

extern "C" void MatkakirjaAani_Toisto(void)
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    NSError* virhe = nil;
    if (![istunto setCategory:AVAudioSessionCategoryPlayback
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
