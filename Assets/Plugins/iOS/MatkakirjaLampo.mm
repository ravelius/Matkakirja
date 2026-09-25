// Lämpötila ja virransäästö (Pelikoodari, lämpöerä 25.9.2026; Raamattu LÄMPÖ JA VIRRANKULUTUS NATIIVISSA).
// Kartta/Lampo.cs lukee nämä kahden sekunnin välein.
#import <Foundation/Foundation.h>

// NSProcessInfoThermalState: 0 nominal, 1 fair, 2 serious, 3 critical.
extern "C" int MatkakirjaLampo_Tila(void)
{
    return (int)[NSProcessInfo processInfo].thermalState;
}

extern "C" int MatkakirjaLampo_Virransaasto(void)
{
    return [NSProcessInfo processInfo].isLowPowerModeEnabled ? 1 : 0;
}
