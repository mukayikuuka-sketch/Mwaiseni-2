# --- ZAMSTAY FRONTEND FULL BLUEPRINT AUDIT ---

# 1. Define your blueprint
$blueprint = @{
    "Pages" = @(
        "HomePage.tsx", "SearchResultsPage.tsx", "PropertyDetailsPage.tsx",
        "LoginPage.tsx", "RegisterPage.tsx", "CheckoutPage.tsx",
        "BookingConfirmationPage.tsx", "MyTripsPage.tsx", "SavedPage.tsx",
        "ProfilePage.tsx", "PartnerLandingPage.tsx", "PartnerDashboard.tsx",
        "Earnings.tsx", "AddPropertyWizard.tsx", "PartnerInventoryHub.tsx",
        "PartnerLoginPage.tsx", "PartnerSignupPage.tsx", "PartnerStart.tsx"
    )
    "Engine" = @(
        "AuthContext.tsx", "ProtectedRoute.tsx", "SearchBar.tsx",
        "PropertyCard.tsx", "LoadingSpinner.tsx", "PublicLayout.tsx",
        "OwnerLayout.tsx", "api.ts"
    )
}

# 2. Feature checklist per page
$features = @{
    "HomePage.tsx" = @("Hero search", "Popular destinations", "Property categories", "Featured stays", "Why ZamStay section", "Trust badges", "Footer with links")
    "SearchResultsPage.tsx" = @("Search bar visible", "Filters: price, type, bedrooms, amenities", "Sorting options", "Wishlist button", "Empty state UI", "Pagination / infinite scroll")
    "PropertyDetailsPage.tsx" = @("Photo gallery (10+)", "Title + location", "Price breakdown", "Rating + review count", "Booking card", "Amenities list", "Room breakdown", "House rules", "Check-in/out times", "Cancellation policy", "Location map", "Nearby attractions", "Similar stays")
    "CheckoutPage.tsx" = @("Select dates", "Guests", "Price breakdown", "Payment method", "Confirmation page", "Booking email / in-app receipt")
    "ProfilePage.tsx" = @("Profile info", "My bookings", "Messages", "Saved stays", "Reviews written", "Payments", "Notifications", "Security settings")
    "PartnerDashboard.tsx" = @("Listings overview", "Reservations", "Calendar", "Pricing", "Messages", "Reviews", "Earnings", "Payouts", "Analytics", "Settings", "Support")
    "AddPropertyWizard.tsx" = @("Step 1: Account", "Step 2: Business info", "Step 3: Property type", "Step 4: Location", "Step 5: Rooms", "Step 6: Amenities", "Step 7: Photos", "Step 8: Pricing", "Step 9: Availability", "Step 10: Policies", "Step 11: Payout setup", "Step 12: Submit for review", "Progress bar", "Save and continue later")
}

# 3. Function to check files (Scanning the whole project)
function Test-Files {
    param([string[]]$list)
    foreach ($item in $list) {
        $found = Get-ChildItem -Recurse -Filter $item -ErrorAction SilentlyContinue
        if ($found) {
            Write-Host "[OK] Verified: $item" -ForegroundColor Green
        } else {
            Write-Host "[MISSING] Action Required: $item" -ForegroundColor Red
        }
    }
}

# 4. Function to list features
function Show-Features {
    foreach ($page in $features.Keys) {
        Write-Host "`n[$page Features]" -ForegroundColor Cyan
        foreach ($feature in $features[$page]) {
            Write-Host "[ ] $feature"
        }
    }
}

Write-Host "`n--- ZAMSTAY FRONTEND FILE AUDIT ---`n" -ForegroundColor Yellow
Test-Files -list ($blueprint["Pages"] + $blueprint["Engine"])

Write-Host "`n--- ZAMSTAY FRONTEND FEATURE CHECKLIST ---`n" -ForegroundColor Yellow
Show-Features

Write-Host "`n--- AUDIT COMPLETE ---`n" -ForegroundColor Yellow
