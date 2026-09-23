// MatkakirjaRadio.mm — maailmanradion suora lähetys AVPlayerilla (Linssiseppä 23.9.2026).
//
// Webin radio soittaa <audio>-elementillä Icecast/Shoutcast-virtoja (mp3, aac) ja
// HLS:ää; Unityn AudioSource ei soita loputonta verkkovirtaa luotettavasti, joten
// natiivissa soittaa AVPlayer. Yksi virta kerrallaan.
//
// Unity-puoli: Linssit/Unity/RadioVirta.cs (IRadioVirta), joka kysyy tilan joka kehys:
//   MatkakirjaRadio_Avaa(url)          uusi virta, soitto alkaa mykkänä (voimakkuus 0)
//   MatkakirjaRadio_Sulje()            virta pois
//   MatkakirjaRadio_Voimakkuus(0…1)    ristihäivytys (RadioLinssi)
//   MatkakirjaRadio_Tila()             0 ei virtaa, 1 yhdistää, 2 soi, 3 ei vastaa, 4 katkesi
//
// "Soi" = timeControlStatus Playing ja kohdan eteneminen (kuten webin 'playing' tai
// 'timeupdate'): puskurointi ei ole vielä kuulumista.
//
// Ääni-istunto: Playback + MixWithOthers kuten MatkakirjaAani.mm (äänettömyyskytkin ei
// mykistä radiota, pelaajan oma musiikki ei katkea).
//
// Vaatii: ARC, AVFoundation.framework (Unityn iOS-projektissa linkitetty oletuksena).

#import <AVFoundation/AVFoundation.h>

#if !__has_feature(objc_arc)
#error "MatkakirjaRadio.mm vaatii ARC:n (-fobjc-arc)"
#endif

@interface MatkakirjaRadio : NSObject
@property (nonatomic, strong) AVPlayer* soitin;
@property (nonatomic, strong) id loppuTarkkailija;
@property (nonatomic, strong) id virheTarkkailija;
@property (nonatomic) int loppuTila;   // 0 = ei, 3 = ei vastaa, 4 = katkesi
@property (nonatomic) float voimakkuus;
@end

@implementation MatkakirjaRadio

+ (instancetype)jaettu
{
    static MatkakirjaRadio* radio = nil;
    static dispatch_once_t kerran;
    dispatch_once(&kerran, ^{ radio = [MatkakirjaRadio new]; });
    return radio;
}

- (void)istunto
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    NSError* virhe = nil;
    if (![istunto setCategory:AVAudioSessionCategoryPlayback
                         mode:AVAudioSessionModeDefault
                      options:AVAudioSessionCategoryOptionMixWithOthers
                        error:&virhe])
        NSLog(@"MATKAKIRJA radio: setCategory epäonnistui: %@", virhe);
    if (![istunto setActive:YES error:&virhe])
        NSLog(@"MATKAKIRJA radio: setActive epäonnistui: %@", virhe);
}

- (void)avaa:(NSString*)osoite
{
    [self sulje];
    NSURL* url = [NSURL URLWithString:osoite];
    if (url == nil) { self.loppuTila = 3; return; }
    [self istunto];
    AVPlayerItem* kohde = [AVPlayerItem playerItemWithURL:url];
    // Suora lähetys: pieni puskuri riittää, ja soitto alkaa heti kun voi.
    kohde.preferredForwardBufferDuration = 2.0;
    self.soitin = [AVPlayer playerWithPlayerItem:kohde];
    self.soitin.automaticallyWaitsToMinimizeStalling = NO;
    self.soitin.volume = 0;
    self.voimakkuus = 0;
    self.loppuTila = 0;
    __weak MatkakirjaRadio* heikko = self;
    NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
    self.loppuTarkkailija = [nc addObserverForName:AVPlayerItemDidPlayToEndTimeNotification object:kohde
        queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification* n) { heikko.loppuTila = 4; }];
    self.virheTarkkailija = [nc addObserverForName:AVPlayerItemFailedToPlayToEndTimeNotification object:kohde
        queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification* n) { heikko.loppuTila = 4; }];
    [self.soitin play];
}

- (void)sulje
{
    NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
    if (self.loppuTarkkailija) [nc removeObserver:self.loppuTarkkailija];
    if (self.virheTarkkailija) [nc removeObserver:self.virheTarkkailija];
    self.loppuTarkkailija = nil;
    self.virheTarkkailija = nil;
    [self.soitin pause];
    [self.soitin replaceCurrentItemWithPlayerItem:nil];
    self.soitin = nil;
    self.loppuTila = 0;
}

- (int)tila
{
    if (self.soitin == nil) return self.loppuTila;
    if (self.loppuTila != 0) return self.loppuTila;
    AVPlayerItem* kohde = self.soitin.currentItem;
    if (self.soitin.status == AVPlayerStatusFailed || kohde.status == AVPlayerItemStatusFailed) return 3;
    if (self.soitin.timeControlStatus == AVPlayerTimeControlStatusPlaying
        && CMTimeGetSeconds(kohde.currentTime) > 0) return 2;
    return 1;
}

@end

extern "C" {

void MatkakirjaRadio_Avaa(const char* osoite)
{
    if (osoite == NULL) return;
    [[MatkakirjaRadio jaettu] avaa:[NSString stringWithUTF8String:osoite]];
}

void MatkakirjaRadio_Sulje(void)
{
    [[MatkakirjaRadio jaettu] sulje];
}

void MatkakirjaRadio_Voimakkuus(float arvo)
{
    MatkakirjaRadio* radio = [MatkakirjaRadio jaettu];
    radio.voimakkuus = arvo < 0 ? 0 : arvo > 1 ? 1 : arvo;
    radio.soitin.volume = radio.voimakkuus;
}

int MatkakirjaRadio_Tila(void)
{
    return [[MatkakirjaRadio jaettu] tila];
}

}
