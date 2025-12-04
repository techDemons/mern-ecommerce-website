import {
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";




export function SizeChartDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3, overflow: "hidden" },
      }}
    >
      <Stack
        position="relative"
        p={{ xs: 3, sm: 6 }}
        textAlign="center"
        spacing={3}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "grey.100",
            "&:hover": { bgcolor: "grey.200" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h4" fontWeight="bold">
          Size Chart
        </Typography>

        {/* Table */}
        <Paper elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ bgcolor: "grey.100" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Size
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Waist
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Brand Size
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Length
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell align="center">28</TableCell>
                <TableCell align="center">34</TableCell>
                <TableCell align="center">36</TableCell>
                <TableCell align="center">44</TableCell>
              </TableRow>

              <TableRow hover>
                <TableCell align="center">30</TableCell>
                <TableCell align="center">35.5</TableCell>
                <TableCell align="center">38</TableCell>
                <TableCell align="center">42</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">32</TableCell>
                <TableCell align="center">35.5</TableCell>
                <TableCell align="center">36</TableCell>
                <TableCell align="center">45</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell align="center">30</TableCell>
                <TableCell align="center">32.5</TableCell>
                <TableCell align="center">34</TableCell>
                <TableCell align="center">38</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Stack>
    </Dialog>
  );
}