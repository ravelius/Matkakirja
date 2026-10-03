// MatkakirjaHaptiikka.mm — kevyt valintanapsahdus (Linssiseppä 2, 3.10.2026; omistaja: "pienen haptisen tunnisteen aina kun kohde
// vaihtuu palloa pyörittäessä"). UISelectionFeedbackGenerator on iOS:n oma valitsimen (picker) tuntuma: hento eikä väsytä
// nopeassa pyörityksessä. Generaattori valmistellaan tartunnassa (Valmistele), jotta ensimmäinen napsahdus ei viivästy.
// Simulaattorissa ja laitteilla ilman Taptic Enginea kutsu ei tee mitään. Unity-puoli: UI/Linssit/Sijaintipallo.cs.

#import <UIKit/UIKit.h>

static UISelectionFeedbackGenerator* valitsin;

static UISelectionFeedbackGenerator* Hae(void)
{
    if (valitsin == nil) valitsin = [[UISelectionFeedbackGenerator alloc] init];
    return valitsin;
}

extern "C" void MatkakirjaHaptiikka_Valmistele(void)
{
    dispatch_async(dispatch_get_main_queue(), ^{ [Hae() prepare]; });
}

extern "C" void MatkakirjaHaptiikka_Valinta(void)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        UISelectionFeedbackGenerator* g = Hae();
        [g selectionChanged];
        [g prepare];
    });
}
