// MatkakirjaJako.mm — iOS:n jakoarkki tekstille (Pelikoodari, 24.9.2026).
//
// Web: ui.js natiiviJaaTeksti(matkanYhteenveto) (navigator.share / iOS-kuori). Natiivi:
// UIActivityViewController Unityn näkymän päältä; iPadilla popover ruudun keskeltä ilman nuolta.
// Unity-puoli: Scripts/Peli/Jakaminen.cs. valmis(pyynto, jaettu) kutsutaan pääsäikeessä tasan kerran.

#import <UIKit/UIKit.h>

extern "C" UIViewController* UnityGetGLViewController(void);

typedef void (*MatkakirjaJako_Valmis)(int pyynto, int jaettu);

extern "C" void MatkakirjaJako_Jaa(int pyynto, const char* teksti, MatkakirjaJako_Valmis valmis)
{
    NSString* t = teksti ? [NSString stringWithUTF8String:teksti] : @"";
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController* isanta = UnityGetGLViewController();
        while (isanta.presentedViewController && !isanta.presentedViewController.isBeingDismissed)
            isanta = isanta.presentedViewController;
        if (isanta == nil || t.length == 0)
        {
            NSLog(@"MATKAKIRJA jako: näkymää tai tekstiä ei ole");
            if (valmis) valmis(pyynto, 0);
            return;
        }
        UIActivityViewController* arkki = [[UIActivityViewController alloc] initWithActivityItems:@[ t ]
                                                                            applicationActivities:nil];
        __block BOOL ilmoitettu = NO;
        arkki.completionWithItemsHandler = ^(UIActivityType tyyppi, BOOL valmistui, NSArray* palautetut, NSError* virhe) {
            if (virhe) NSLog(@"MATKAKIRJA jako: %@", virhe);
            if (ilmoitettu) return;
            ilmoitettu = YES;
            if (valmis) valmis(pyynto, valmistui ? 1 : 0);
        };
        UIPopoverPresentationController* pop = arkki.popoverPresentationController;
        if (pop)
        {
            UIView* v = isanta.view;
            pop.sourceView = v;
            pop.sourceRect = CGRectMake(CGRectGetMidX(v.bounds), CGRectGetMidY(v.bounds), 1, 1);
            pop.permittedArrowDirections = 0;
        }
        [isanta presentViewController:arkki animated:YES completion:nil];
    });
}
