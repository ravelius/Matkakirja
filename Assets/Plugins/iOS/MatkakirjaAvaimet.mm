// MatkakirjaAvaimet.mm — pienet salaisuudet iOS:n Keychainiin (Pelikoodari, 24.9.2026).
//
// Natiivi-UI:n pyyntö (Fablen vaatimus): KOKEET-työhuoneen kuratointiavain säilytetään vain
// Keychainissa. kSecClassGenericPassword, palvelu "fi.matkakirja.avaimet", tili = nimi,
// kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly (ei iCloud-avainnippuun, ei varmuuskopion siirtoon).
// Arvoa EI koskaan lokiin; lokiin vain nimi ja OSStatus.
// Unity-puoli: Natiivi-UI kutsuu suoraan DllImportilla (#if UNITY_IOS && !UNITY_EDITOR).
//   int   MatkakirjaAvaimet_Aseta(nimi, arvo)  1 = ok; arvo NULL tai "" = poisto
//   char* MatkakirjaAvaimet_Hae(nimi)          strdup'd UTF-8 tai NULL (Unity vapauttaa free():llä)

#import <Foundation/Foundation.h>
#import <Security/Security.h>
#include <string.h>

// Security.framework linkittyy ilman pbxproj-muutosta (vrt. MatkakirjaKuvat.mm).
__asm__(".linker_option \"-framework\", \"Security\"\n");

static NSString* const MatkakirjaAvaimet_Palvelu = @"fi.matkakirja.avaimet";

static NSMutableDictionary* MatkakirjaAvaimet_Haku(NSString* nimi)
{
    return [@{ (__bridge id)kSecClass: (__bridge id)kSecClassGenericPassword,
               (__bridge id)kSecAttrService: MatkakirjaAvaimet_Palvelu,
               (__bridge id)kSecAttrAccount: nimi } mutableCopy];
}

extern "C" int MatkakirjaAvaimet_Aseta(const char* nimi, const char* arvo)
{
    if (nimi == NULL || nimi[0] == 0) return 0;
    NSString* n = [NSString stringWithUTF8String:nimi];
    if (n == nil) return 0;
    NSMutableDictionary* haku = MatkakirjaAvaimet_Haku(n);
    if (arvo == NULL || arvo[0] == 0)
    {
        OSStatus s = SecItemDelete((__bridge CFDictionaryRef)haku);
        if (s != errSecSuccess && s != errSecItemNotFound) NSLog(@"MATKAKIRJA avaimet: poisto %@ epäonnistui (%d)", n, (int)s);
        return (s == errSecSuccess || s == errSecItemNotFound) ? 1 : 0;
    }
    NSData* data = [NSData dataWithBytes:arvo length:strlen(arvo)];
    NSDictionary* paivitys = @{ (__bridge id)kSecValueData: data,
                                (__bridge id)kSecAttrAccessible: (__bridge id)kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly };
    OSStatus s = SecItemUpdate((__bridge CFDictionaryRef)haku, (__bridge CFDictionaryRef)paivitys);
    if (s == errSecItemNotFound)
    {
        [haku addEntriesFromDictionary:paivitys];
        s = SecItemAdd((__bridge CFDictionaryRef)haku, NULL);
    }
    if (s != errSecSuccess) NSLog(@"MATKAKIRJA avaimet: tallennus %@ epäonnistui (%d)", n, (int)s);
    return s == errSecSuccess ? 1 : 0;
}

extern "C" char* MatkakirjaAvaimet_Hae(const char* nimi)
{
    if (nimi == NULL || nimi[0] == 0) return NULL;
    NSString* n = [NSString stringWithUTF8String:nimi];
    if (n == nil) return NULL;
    NSMutableDictionary* haku = MatkakirjaAvaimet_Haku(n);
    haku[(__bridge id)kSecReturnData] = @YES;
    haku[(__bridge id)kSecMatchLimit] = (__bridge id)kSecMatchLimitOne;
    CFTypeRef tulos = NULL;
    OSStatus s = SecItemCopyMatching((__bridge CFDictionaryRef)haku, &tulos);
    if (s != errSecSuccess || tulos == NULL)
    {
        if (s != errSecItemNotFound) NSLog(@"MATKAKIRJA avaimet: haku %@ epäonnistui (%d)", n, (int)s);
        return NULL;
    }
    NSData* data = (__bridge_transfer NSData*)tulos;
    char* ulos = (char*)malloc(data.length + 1);
    if (ulos == NULL) return NULL;
    memcpy(ulos, data.bytes, data.length);
    ulos[data.length] = 0;
    return ulos;
}
