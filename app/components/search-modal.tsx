import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
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
            <div className="flex items-center gap-2 cursor-pointer">
              <SearchIcon/>
              ポケモンを探す
            </div>
            <AlertDialogDescription>
              {/* isModalでmodalの場合だけスタイルを変える */}
              <SearchAndNavigation isModal />
            </AlertDialogDescription>
          </AlertDialogHeader>

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
