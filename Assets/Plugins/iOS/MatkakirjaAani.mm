// MatkakirjaAani.mm — natiivin Matkakirjan ääni-istunto (Pelikoodari, 23.9.2026).
//
// Unityn oletusistunto on AVAudioSessionCategoryAmbient (ProjectSettings:
// muteOtherAudioSources 0), jonka iPhonen äänettömyyskytkin mykistää. Isoisän
// luennat ovat pelin sisältöä kuten webin <audio> (Safari soittaa sen
// kytkimestä huolimatta), joten puhe asettaa istunnon Playback-luokkaan.
// MixWithOthers: pelaajan oma musiikki tai podcast ei katkea.
//
// Unity-puoli: Scripts/Peli/Puhe.cs (MatkakirjaAani_Toisto ennen ensimmäistä puhetta).

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
