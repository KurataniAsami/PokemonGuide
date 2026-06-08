import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchAndNavigation from "./SearchAndNavigation";

export default function SearchModal() {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="ml-5">
            <SearchIcon
              sx={{
                fontSize: 32,
                cursor: 'pointer',
              }}
            />
            検索
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
            <div className="flex items-center gap-2 cursor-pointer">
              <SearchIcon/>
              <span>ポケモンを探す</span>
            </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="ml-7">
              名前で検索できます
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div>
            {/* isModalでmodalの場合だけスタイルを変える */}
              <SearchAndNavigation isModal />
          </div>

          <AlertDialogFooter className="bg-white">
            <AlertDialogCancel className="bg-white border-none">
              <CloseIcon/>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
