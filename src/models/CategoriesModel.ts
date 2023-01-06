export interface ICategory {
  id: string;
  categoryName: string;
  //categoryId: string;
  // displayName: string;
  // hasChildCategories?: boolean;
  // hasDropdownMenu?: boolean;
  // selectedThumbImage?: string;
  // showInAppJaBsDropdown?: boolean;
  // targetUrl?: string;
  // thumbImage?: string;
  // megaNavMarketingBanner?: object;
}

export interface ICategories {
  categories: [] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
