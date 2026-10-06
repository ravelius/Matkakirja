// MatkakirjaValokuva.mm — valmis ISS-kameran kuva myös Kuviin (Linssiseppä 2, 4.10.2026; Päätoimittaja: maksettu kuva säilyy
// pelaajalla uudelleenasennuksen yli). Vain lisäysoikeus (PHAccessLevelAddOnly, Info.plist NSPhotoLibraryAddUsageDescription):
// ensimmäisellä kerralla järjestelmän kysymys; kielto → ei tallennusta (kuva jää sovelluksen albumiin).
//   MatkakirjaValokuva_Tallenna(pyynto, polku, valmis(pyynto, tulos))  tulos 1 tallennettu, 0 ei lupaa, -1 virhe
#import <Photos/Photos.h>
#import <UIKit/UIKit.h>

typedef void (*MatkakirjaValokuva_Valmis)(int pyynto, int tulos);

extern "C" void MatkakirjaValokuva_Tallenna(int pyynto, const char* polku, MatkakirjaValokuva_Valmis valmis)
{
    NSString* p = polku ? [NSString stringWithUTF8String:polku] : @"";
    void (^vastaa)(int) = ^(int tulos) { dispatch_async(dispatch_get_main_queue(), ^{ if (valmis) valmis(pyynto, tulos); }); };
    // Ilman Info.plistin käyttötarkoitusta iOS lopettaa sovelluksen lupakyselyssä: ohitetaan (Natiivisepän plist-haara lisää avaimen).
    if ([[NSBundle mainBundle] objectForInfoDictionaryKey:@"NSPhotoLibraryAddUsageDescription"] == nil)
    {
        NSLog(@"MATKAKIRJA valokuva: NSPhotoLibraryAddUsageDescription puuttuu Info.plististä, Kuviin ei tallenneta");
        vastaa(-1);
        return;
    }
    [PHPhotoLibrary requestAuthorizationForAccessLevel:PHAccessLevelAddOnly handler:^(PHAuthorizationStatus tila) {
        if (tila != PHAuthorizationStatusAuthorized && tila != PHAuthorizationStatusLimited) { vastaa(0); return; }
        NSURL* url = [NSURL fileURLWithPath:p];
        [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
            [PHAssetChangeRequest creationRequestForAssetFromImageAtFileURL:url];
        } completionHandler:^(BOOL ok, NSError* virhe) {
            if (!ok) NSLog(@"MATKAKIRJA valokuva: tallennus %@: %@", p.lastPathComponent, virhe);
            vastaa(ok ? 1 : -1);
        }];
    }];
}
